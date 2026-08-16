import nodemailer from 'nodemailer';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import {
  acknowledgement,
  internalHtml,
  internalSubject,
  internalText,
  makeApplicationId,
  validateClosedTestApplication
} from '../../lib/closed-test.js';

const requiredEnv = [
  'ZOHO_SMTP_HOST', 'ZOHO_SMTP_PORT', 'ZOHO_SMTP_USER', 'ZOHO_SMTP_PASSWORD',
  'SUPPORT_FROM_EMAIL', 'SUPPORT_TO_EMAIL', 'SUPPORT_ALLOWED_ORIGINS',
  'TURNSTILE_SECRET_KEY', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'
];

function allowedOrigins() {
  return new Set(String(process.env.SUPPORT_ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean));
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    Vary: 'Origin'
  };
}

function clientIp(request) {
  return String(request.headers.get('x-nf-client-connection-ip') || request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim().slice(0, 64);
}

async function verifyTurnstile(token, ip) {
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: String(token || ''),
    remoteip: ip
  });
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(6000)
  });
  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}

function mailTransport() {
  const port = Number(process.env.ZOHO_SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port,
    secure: String(process.env.ZOHO_SMTP_SECURE).toLowerCase() !== 'false',
    requireTLS: port === 587,
    auth: { user: process.env.ZOHO_SMTP_USER, pass: process.env.ZOHO_SMTP_PASSWORD },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    disableFileAccess: true,
    disableUrlAccess: true
  });
}

export default async function handler(request) {
  const origin = request.headers.get('origin') || '';
  const allowed = allowedOrigins();
  if (!origin || !allowed.has(origin)) {
    return Response.json({ ok: false, code: 'ORIGIN_NOT_ALLOWED' }, { status: 403 });
  }

  const headers = corsHeaders(origin);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'POST') {
    return Response.json({ ok: false, code: 'METHOD_NOT_ALLOWED' }, { status: 405, headers });
  }

  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error('Closed Test API configuration is incomplete', { missing });
    return Response.json({ ok: false, code: 'SERVICE_NOT_CONFIGURED' }, { status: 503, headers });
  }

  const ip = clientIp(request);
  const redis = Redis.fromEnv();
  const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'feathly:closed-test'
  });
  const limited = await rateLimit.limit(ip);
  if (!limited.success) {
    return Response.json({ ok: false, code: 'RATE_LIMITED' }, { status: 429, headers });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: 'INVALID_JSON' }, { status: 400, headers });
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return Response.json({ ok: false, code: 'CAPTCHA_FAILED' }, { status: 400, headers });
  }

  let submission;
  try {
    submission = validateClosedTestApplication(body);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'INVALID_REQUEST';
    const status = code === 'SPAM' ? 202 : 400;
    return Response.json({ ok: code === 'SPAM', code }, { status, headers });
  }

  const applicationId = makeApplicationId();
  const transport = mailTransport();
  const from = {
    name: process.env.SUPPORT_FROM_NAME || 'Feathly Support',
    address: process.env.SUPPORT_FROM_EMAIL
  };

  try {
    await transport.sendMail({
      from,
      to: process.env.SUPPORT_TO_EMAIL,
      replyTo: submission.email,
      subject: internalSubject(applicationId, submission),
      text: internalText(applicationId, submission),
      html: internalHtml(applicationId, submission),
      disableFileAccess: true,
      disableUrlAccess: true
    });

    const ack = acknowledgement(applicationId, submission.locale);
    try {
      await transport.sendMail({
        from,
        to: submission.email,
        replyTo: process.env.SUPPORT_TO_EMAIL,
        ...ack,
        disableFileAccess: true,
        disableUrlAccess: true
      });
    } catch {
      console.error('Closed Test acknowledgement failed', { applicationId });
    }

    return Response.json({ ok: true, applicationId }, { status: 200, headers });
  } catch {
    console.error('Closed Test application delivery failed', { applicationId });
    return Response.json({ ok: false, code: 'DELIVERY_FAILED' }, { status: 502, headers });
  } finally {
    transport.close();
  }
}
