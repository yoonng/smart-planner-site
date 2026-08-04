from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
css_path = Path('assets/user-guide-visuals.css')
html = html_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')

# Step 1: move the label outside the screenshot and tighten the box to the title/note inputs.
old = '''              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/01-form-top.png" alt="Routine Loop form with the title and note area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:15%;--focus-left:6%;--focus-width:88%;--focus-height:32%;"><span>Title &amp; note</span></div>
                </div>
                <figcaption>Example: <strong>Weekly fridge check</strong>. Use the note for temperature, expiry-date, and cleaning checks.</figcaption>
              </figure>'''
new = '''              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Title &amp; note</div>
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/01-form-top.png" alt="Routine Loop form with only the title and note inputs highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:18%;--focus-left:8%;--focus-width:84%;--focus-height:28%;"></div>
                </div>
                <figcaption>Example: <strong>Weekly fridge check</strong>. Use the note for temperature, expiry-date, and cleaning checks.</figcaption>
              </figure>'''
if old not in html:
    raise SystemExit('Step 1 block not found')
html = html.replace(old, new, 1)

# Step 2: highlight Repeat only; do not include Notify time.
old = '''              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/02-form-middle.png" alt="Routine Loop form with the repeat rule area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:25%;--focus-left:6%;--focus-width:88%;--focus-height:40%;"><span>Repeat rule</span></div>
                </div>
                <figcaption>The repeat rule controls when the next occurrence is prepared.</figcaption>
              </figure>'''
new = '''              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Repeat rule</div>
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/02-form-middle.png" alt="Routine Loop form with only the Repeat options highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:28%;--focus-left:8%;--focus-width:84%;--focus-height:20%;"></div>
                </div>
                <figcaption>The repeat rule controls when the next occurrence is prepared. Notify time is configured separately below it.</figcaption>
              </figure>'''
if old not in html:
    raise SystemExit('Step 2 block not found')
html = html.replace(old, new, 1)

# Step 3: keep its region but move the label outside so it cannot hide controls.
old = '''              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/03-form-bottom.png" alt="Routine Loop form with the schedule and Save area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:42%;--focus-left:6%;--focus-width:88%;--focus-height:47%;"><span>Schedule &amp; Save</span></div>
                </div>
                <figcaption>Example: every Friday at 5:00 PM.</figcaption>
              </figure>'''
new = '''              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Schedule &amp; Save</div>
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/03-form-bottom.png" alt="Routine Loop form with the schedule controls highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:42%;--focus-left:8%;--focus-width:84%;--focus-height:43%;"></div>
                </div>
                <figcaption>Choose the day and time, then use the Save button at the top of the form.</figcaption>
              </figure>'''
if old not in html:
    raise SystemExit('Step 3 block not found')
html = html.replace(old, new, 1)

# Step 4: the supplied detail image does not show a Complete control. Describe and highlight what is actually visible.
html = html.replace('<h3>Complete the current occurrence</h3>\n                  <p>When the action is due, complete this occurrence. The Routine remains and prepares its next scheduled occurrence.</p>', '<h3>Review the saved Routine</h3>\n                  <p>After saving, open the Routine and confirm its note, category, and repeat settings. Complete an occurrence later from the due item on Home.</p>', 1)
old = '''              <figure class="manual-shot manual-step-shot">
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/04-detail.png" alt="Routine Loop detail screen with the completion area highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:68%;--focus-left:6%;--focus-width:88%;--focus-height:18%;"><span>Complete</span></div>
                </div>
                <figcaption>Completing one occurrence does not delete the Routine.</figcaption>
              </figure>'''
new = '''              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Saved repeat settings</div>
                <div class="manual-image-frame">
                  <img src="/assets/user-guide/en/routine/04-detail.png" alt="Saved Routine Loop detail screen with its Repeat settings highlighted" loading="lazy">
                  <div class="routine-focus-box" style="--focus-top:68%;--focus-left:8%;--focus-width:84%;--focus-height:26%;"></div>
                </div>
                <figcaption>This image shows the saved Repeat settings. The completion control is not visible in this capture.</figcaption>
              </figure>'''
if old not in html:
    raise SystemExit('Step 4 block not found')
html = html.replace(old, new, 1)

# Replace overlay-label CSS with a normal-flow badge and a lighter focus box.
css = re.sub(
    r'''\.routine-focus-box \{.*?\n\}\n\.routine-focus-box span \{.*?\n\}\n@media \(max-width: 620px\) \{\n  \.manual-image-frame,\n  \.manual-image-frame > img \{ border-radius: 10px; \}\n  \.routine-focus-box \{ border-width: 2px; border-radius: 9px; \}\n  \.routine-focus-box span \{ top: -11px; right: 4px; padding: 4px 6px; font-size: 8px; \}\n\}''',
    '''.routine-step-badge {
  display: inline-flex;
  align-items: center;
  margin: 0 0 9px 2px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  line-height: 1.2;
  box-shadow: 0 5px 14px rgba(37,99,235,.20);
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
  border-radius: 12px;
  background: rgba(37, 99, 235, .035);
  box-shadow: 0 0 0 1px rgba(255,255,255,.82), 0 8px 20px rgba(37,99,235,.14);
  pointer-events: none;
}
@media (max-width: 620px) {
  .manual-image-frame,
  .manual-image-frame > img { border-radius: 10px; }
  .routine-step-badge { margin-bottom: 6px; padding: 4px 7px; font-size: 9px; }
  .routine-focus-box { border-width: 2px; border-radius: 8px; }
}''',
    css,
    count=1,
    flags=re.S,
)

html_path.write_text(html, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
print('Routine highlight boxes corrected.')
