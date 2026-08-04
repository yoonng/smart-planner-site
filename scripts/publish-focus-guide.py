from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
css_path = Path('assets/user-guide-visuals.css')
context_path = Path('docs/AI_WORKING_CONTEXT.md')

html = html_path.read_text(encoding='utf-8')

focus_section = '''        <section class="guide-section" id="focus">
          <div class="guide-section-head">
            <span>Feature 01</span>
            <h2>Focus Timer</h2>
            <p>Open Focus Timer, choose a template, confirm the start options, and then run the focus session.</p>
          </div>

          <figure class="manual-shot focus-flow-shot">
            <img src="/assets/user-guide/en/focus/focus-timer-flow.webp" alt="Four-step Focus Timer guide showing the main menu, template selection, start options, and a running focus session" loading="lazy">
            <figcaption>The red outlines show exactly what to tap at each step.</figcaption>
          </figure>

          <div class="focus-flow-copy" aria-label="Focus Timer steps">
            <article>
              <span>1</span>
              <div>
                <h3>Open Focus Timer</h3>
                <p>From Home, open the main menu and tap <strong>Focus Timer</strong>.</p>
              </div>
            </article>
            <article>
              <span>2</span>
              <div>
                <h3>Choose a template</h3>
                <p>On the <strong>Templates</strong> tab, tap the triangle play button on the template you want to use.</p>
              </div>
            </article>
            <article>
              <span>3</span>
              <div>
                <h3>Start Focus Timer</h3>
                <p>Choose the repeat count, optionally link a Loop, and tap <strong>Start Focus Timer</strong>.</p>
              </div>
            </article>
            <article>
              <span>4</span>
              <div>
                <h3>Focus session running</h3>
                <p>The large circle shows the current focus time. The smaller circle shows the break time. Use the bottom controls to pause or end the session.</p>
              </div>
            </article>
          </div>

          <div class="guide-callout tip">
            <h3>Focus Timer flow</h3>
            <p>Menu → Template → Repeat count and optional Loop link → Start Focus Timer → Running session.</p>
          </div>
        </section>'''

pattern = r'        <section class="guide-section" id="focus">.*?        </section>'
html, count = re.subn(pattern, focus_section, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit('Focus Timer section was not found exactly once.')
html_path.write_text(html, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
marker = '/* Focus Timer four-step composite */'
if marker not in css:
    css += '''

/* Focus Timer four-step composite */
.focus-flow-shot {
  width: 100%;
  max-width: none !important;
  margin: 20px 0 18px;
  padding: 10px;
  overflow: hidden;
}
.focus-flow-shot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
}
.focus-flow-copy {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0 20px;
}
.focus-flow-copy article {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  border: 1px solid #dbe5f1;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(30, 64, 175, .06);
}
.focus-flow-copy article > span {
  display: inline-grid;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  background: #1677ed;
  color: #fff;
  font-weight: 900;
  line-height: 1;
}
.focus-flow-copy h3 {
  margin: 1px 0 6px;
  font-size: 16px;
  line-height: 1.3;
}
.focus-flow-copy p {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
}
@media (max-width: 960px) {
  .focus-flow-copy { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 620px) {
  .focus-flow-shot { padding: 5px; border-radius: 14px; }
  .focus-flow-shot img { border-radius: 10px; }
  .focus-flow-copy { grid-template-columns: 1fr; gap: 10px; }
  .focus-flow-copy article { padding: 13px; }
}
'''
    css_path.write_text(css, encoding='utf-8')

context_path.parent.mkdir(parents=True, exist_ok=True)
context_path.write_text('''# AI Working Context — Smart Planner Site

This file records the fixed operating context for website manual work.

- Website repository: `yoonng/smart-planner-site`
- Default branch: `main`
- Default workflow: edit and commit directly to `main`; do not create a feature branch or PR unless the user explicitly requests one.
- English manual page: `smart-planner/user-guide.html`
- User-guide visual stylesheet: `assets/user-guide-visuals.css`
- Public manual assets: `assets/user-guide/`
- Source app/manual repository when new screenshots are supplied: `yoonng/feathly-smart-planner`, normally under `manual/0.9/`
- After one-time GitHub Actions are used for file transfer or scripted edits, remove the temporary workflow and trigger files immediately.

Do not claim that GitHub access is unavailable before checking the installed GitHub connector and this repository context.
''', encoding='utf-8')

print('Focus Timer guide, responsive styles, and working context updated.')
