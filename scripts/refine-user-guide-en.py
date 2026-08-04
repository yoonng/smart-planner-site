from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
css_path = Path('assets/user-guide-visuals.css')
html = html_path.read_text(encoding='utf-8')

routine = '''        <section class="guide-section" id="routine-loop">
          <div class="guide-section-head">
            <span>Beginner 06</span>
            <h2>Create your first Routine Loop</h2>
            <p>Use a Routine Loop for an action that repeats on a regular schedule. Follow each numbered step and check the marked area on the screen.</p>
          </div>

          <div class="manual-step-list">
            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">1</span>
                <div>
                  <h3>Enter the action</h3>
                  <p>Add a short title and an optional note. The note can hold a checklist, standard, or details you need when the Routine becomes due.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-shot-label">Title and note</div>
                <img src="/assets/user-guide/en/routine/01-form-top.png" alt="Top of the Routine Loop form showing the title and note fields" loading="lazy">
                <figcaption>Example: <strong>Weekly fridge check</strong> with temperature, expiry-date, and cleanliness checks in the note.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">2</span>
                <div>
                  <h3>Choose the repeat rule</h3>
                  <p>Select how often the action repeats. Use a daily, weekly, monthly, or other available rule that matches the real task.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-shot-label">Repeat rule</div>
                <img src="/assets/user-guide/en/routine/02-form-middle.png" alt="Middle of the Routine Loop form showing the repeat rule" loading="lazy">
                <figcaption>The repeat rule controls when the next occurrence is prepared after the current one is completed.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">3</span>
                <div>
                  <h3>Set the schedule and save</h3>
                  <p>Choose the weekday or date, time, and notification options. Check the final schedule before tapping <strong>Save</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-shot-label">Schedule and Save</div>
                <img src="/assets/user-guide/en/routine/03-form-bottom.png" alt="Bottom of the Routine Loop form showing schedule options and the Save action" loading="lazy">
                <figcaption>For example, schedule a weekly check for Friday at 5:00 PM.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">4</span>
                <div>
                  <h3>Complete the current occurrence</h3>
                  <p>When the action becomes due, open the Routine, read the note if needed, and complete the current occurrence. Feathly keeps the next regular occurrence scheduled.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-shot-label">Complete occurrence</div>
                <img src="/assets/user-guide/en/routine/04-detail.png" alt="Routine Loop detail screen with a note and completion action" loading="lazy">
                <figcaption>Complete only the current occurrence; the Routine itself remains available for its next scheduled time.</figcaption>
              </figure>
            </article>
          </div>
        </section>'''

insights = '''        <section class="guide-section" id="insights">
          <div class="guide-section-head">
            <span>Feature 03</span>
            <h2>Insights</h2>
            <p>Open <strong>Insights</strong> from the drawer to review completion and activity information.</p>
          </div>

          <figure class="manual-shot manual-shot-single">
            <div class="manual-shot-label">Weekly Insights</div>
            <img src="/assets/user-guide/en/insights/01-top.png" alt="Full Weekly Insights screen" loading="lazy">
            <figcaption>The full screen already fits in one capture, so duplicate top, middle, and bottom images are not needed.</figcaption>
          </figure>

          <div class="guide-callout tip">
            <h3>Use Insights as a reference</h3>
            <p>Review completion and activity information without treating the numbers as pressure to add more work.</p>
          </div>
        </section>'''

pro = '''        <section class="guide-section" id="pro">
          <div class="guide-section-head">
            <span>Feature 05</span>
            <h2>PRO information</h2>
            <p>Review available features and the purchase or restore guidance before continuing to Google Play.</p>
          </div>

          <figure class="manual-shot manual-shot-single">
            <div class="manual-shot-label">PRO overview</div>
            <img src="/assets/user-guide/en/pro/01-top.png" alt="Feathly PRO information screen" loading="lazy">
            <figcaption>The whole PRO information screen is visible in one capture, so only one representative image is shown.</figcaption>
          </figure>

          <div class="guide-callout warning">
            <h3>Google Play completes the purchase</h3>
            <p>No real purchase was performed for this screenshot. Confirm the account, price, and terms displayed by Google Play before approving payment.</p>
          </div>
        </section>'''

for section_id, replacement in [('routine-loop', routine), ('insights', insights), ('pro', pro)]:
    pattern = rf'        <section class="guide-section" id="{section_id}">.*?        </section>'
    html, count = re.subn(pattern, replacement, html, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f'Section not found: {section_id}')

labels = {
    '/assets/user-guide/en/recall/01-result-actions.png': 'Choose a result',
    '/assets/user-guide/en/recall/02-next-schedule.png': 'Check the next schedule',
    '/assets/user-guide/en/focus/01-hub.png': 'Focus Timer hub',
    '/assets/user-guide/en/backup/01-top.png': 'Overview',
    '/assets/user-guide/en/backup/02-middle.png': 'Backup options',
    '/assets/user-guide/en/backup/03-bottom.png': 'Restore and warnings',
    '/assets/user-guide/en/backup/04-password-sheet.png': 'Password protection',
    '/assets/user-guide/en/settings/01-top.png': 'General preferences',
    '/assets/user-guide/en/settings/02-middle.png': 'Time and schedule',
    '/assets/user-guide/en/settings/03-bottom.png': 'Notifications and data',
}
for src, label in labels.items():
    pattern = rf'(<figure class="manual-shot(?: manual-shot-single)?">\s*)(<img src="{re.escape(src)}")'
    html, count = re.subn(pattern, rf'\1<div class="manual-shot-label">{label}</div>\n            \2', html, count=1)
    if count != 1:
        raise SystemExit(f'Image location not found: {src}')

html_path.write_text(html, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
marker = '/* Manual step cards and screen location labels */'
styles = r'''

/* Manual step cards and screen location labels */
.manual-shot { position: relative; }
.manual-shot-label {
  position: absolute;
  z-index: 2;
  top: 18px;
  left: 18px;
  max-width: calc(100% - 36px);
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, .88);
  color: #fff;
  font-size: 11px;
  font-weight: 850;
  line-height: 1.2;
  box-shadow: 0 6px 18px rgba(15, 23, 42, .18);
}
.manual-step-list { display: grid; gap: 22px; }
.manual-step-card {
  display: grid;
  grid-template-columns: minmax(220px, .8fr) minmax(300px, 1.2fr);
  gap: 24px;
  align-items: start;
  padding: 22px;
  border: 1px solid #dbe4ef;
  border-radius: 24px;
  background: linear-gradient(145deg, #fff, #f8fbff);
  box-shadow: 0 16px 42px rgba(15, 23, 42, .07);
}
.manual-step-copy { display: flex; gap: 14px; position: sticky; top: 104px; }
.manual-step-copy h3 { margin: 2px 0 8px; color: #111827; font-size: 21px; }
.manual-step-copy p { margin: 0; color: #64748b; line-height: 1.7; }
.manual-step-number {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 900;
}
.manual-step-shot { width: min(100%, 390px); margin: 0 auto; }
@media (max-width: 900px) {
  .manual-step-card { grid-template-columns: 1fr; gap: 16px; padding: 18px; }
  .manual-step-copy { position: static; }
}
@media (max-width: 620px) {
  .manual-step-card { padding: 14px; border-radius: 20px; }
  .manual-step-copy h3 { font-size: 19px; }
  .manual-step-shot { width: 60%; max-width: 220px; padding: 5px; border-radius: 14px; }
  .manual-shot-label { top: 10px; left: 10px; max-width: calc(100% - 20px); padding: 5px 8px; font-size: 10px; }
}
'''
if marker not in css:
    css = css.rstrip() + styles
css_path.write_text(css, encoding='utf-8')

for path in [
    'assets/user-guide/en/insights/02-middle.png',
    'assets/user-guide/en/insights/03-bottom.png',
    'assets/user-guide/en/pro/02-middle.png',
    'assets/user-guide/en/pro/03-bottom.png',
]:
    Path(path).unlink(missing_ok=True)

print('English guide refined and duplicate screenshots removed.')
