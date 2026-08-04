from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
css_path = Path('assets/user-guide-visuals.css')
html = html_path.read_text(encoding='utf-8')

routine = '''        <section class="guide-section" id="routine-loop">
          <div class="guide-section-head">
            <span>Beginner 06</span>
            <h2>Create your first Routine Loop</h2>
            <p>Use a Routine Loop for an action that repeats on a regular schedule. Follow these four steps and use the blue box on each image to find the setting.</p>
          </div>

          <div class="manual-step-list">
            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">1</span>
                <div>
                  <h3>Enter a title and note</h3>
                  <p>Give the action a short name. Add a note only when you need a checklist or extra instructions.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/01-form-top.png" alt="Routine Loop form with the title and note area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:15%;--focus-left:6%;--focus-width:88%;--focus-height:32%;"><span>Title &amp; note</span></div>
                </div>
                <figcaption>Example: <strong>Weekly fridge check</strong>. Use the note for temperature, expiry-date, and cleaning checks.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">2</span>
                <div>
                  <h3>Choose the repeat rule</h3>
                  <p>Select how often the action repeats, such as daily, weekly, or monthly.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/02-form-middle.png" alt="Routine Loop form with the repeat rule area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:25%;--focus-left:6%;--focus-width:88%;--focus-height:40%;"><span>Repeat rule</span></div>
                </div>
                <figcaption>The repeat rule controls when the next occurrence is prepared.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">3</span>
                <div>
                  <h3>Set the schedule and save</h3>
                  <p>Choose the day and time, check notification options, and then tap <strong>Save</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/03-form-bottom.png" alt="Routine Loop form with the schedule and Save area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:42%;--focus-left:6%;--focus-width:88%;--focus-height:47%;"><span>Schedule &amp; Save</span></div>
                </div>
                <figcaption>Example: every Friday at 5:00 PM.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">4</span>
                <div>
                  <h3>Complete the current occurrence</h3>
                  <p>When the action is due, complete this occurrence. The Routine remains and prepares its next scheduled occurrence.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/04-detail.png" alt="Routine Loop detail screen with the completion area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:68%;--focus-left:6%;--focus-width:88%;--focus-height:18%;"><span>Complete</span></div>
                </div>
                <figcaption>Completing one occurrence does not delete the Routine.</figcaption>
              </figure>
            </article>
          </div>
        </section>'''

backup = '''        <section class="guide-section" id="backup">
          <div class="guide-section-head">
            <span>Feature 02</span>
            <h2>Backup and Restore</h2>
            <p>Open the Sync/Backup flow and read the instructions before creating or restoring a file.</p>
          </div>

          <div class="guide-card-grid">
            <article class="guide-card">
              <h3>Before backup</h3>
              <p>Understand what is included and keep any backup password in a safe place.</p>
            </article>
            <article class="guide-card">
              <h3>Before restore</h3>
              <p>Confirm the selected file and understand whether current data will be replaced or merged.</p>
            </article>
          </div>

          <div class="manual-shot-grid manual-shot-grid-two">
            <figure class="manual-shot">
              <div class="manual-shot-label">Overview</div>
              <img src="/assets/user-guide/en/backup/01-top.png" alt="Backup and Restore overview" loading="lazy">
              <figcaption>Review the backup and restore overview first.</figcaption>
            </figure>
            <figure class="manual-shot">
              <div class="manual-shot-label">Backup and restore options</div>
              <img src="/assets/user-guide/en/backup/02-middle.png" alt="Backup and Restore options" loading="lazy">
              <figcaption>Choose the required backup or restore action.</figcaption>
            </figure>
          </div>

          <figure class="manual-shot manual-shot-single">
            <div class="manual-shot-label">Password protection</div>
            <img src="/assets/user-guide/en/backup/04-password-sheet.png" alt="Password-protected backup sheet" loading="lazy">
            <figcaption>Keep the password safe. A protected backup cannot be restored with the wrong password.</figcaption>
          </figure>
        </section>'''

for section_id, replacement in [('routine-loop', routine), ('backup', backup)]:
    pattern = rf'        <section class="guide-section" id="{section_id}">.*?        </section>'
    html, count = re.subn(pattern, replacement, html, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f'Section not found: {section_id}')

html_path.write_text(html, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
marker = '/* Highlighted form regions for Routine Loop steps */'
styles = r'''

/* Highlighted form regions for Routine Loop steps */
.manual-image-frame {
  position: relative;
  overflow: hidden;
  border-radius: 13px;
}
.manual-image-frame > img {
  border-radius: 13px;
}
.routine-focus-box {
  position: absolute;
  z-index: 3;
  top: var(--focus-top);
  left: var(--focus-left);
  width: var(--focus-width);
  height: var(--focus-height);
  box-sizing: border-box;
  border: 3px solid #2563eb;
  border-radius: 14px;
  background: rgba(37, 99, 235, .10);
  box-shadow: 0 0 0 2px rgba(255,255,255,.86), 0 10px 28px rgba(37,99,235,.22);
  pointer-events: none;
}
.routine-focus-box span {
  position: absolute;
  top: -15px;
  right: 8px;
  padding: 5px 9px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 5px 14px rgba(37,99,235,.28);
}
@media (max-width: 620px) {
  .manual-image-frame,
  .manual-image-frame > img { border-radius: 10px; }
  .routine-focus-box { border-width: 2px; border-radius: 9px; }
  .routine-focus-box span { top: -11px; right: 4px; padding: 4px 6px; font-size: 8px; }
}
'''
if marker not in css:
    css = css.rstrip() + styles
css_path.write_text(css, encoding='utf-8')

Path('assets/user-guide/en/backup/03-bottom.png').unlink(missing_ok=True)
print('Routine highlights added and duplicate backup screenshot removed.')
