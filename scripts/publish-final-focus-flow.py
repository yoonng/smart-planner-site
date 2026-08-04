from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
html = html_path.read_text(encoding='utf-8')

section = '''        <section class="guide-section" id="focus" data-focus-guide-build="20260804-final-four-step">
          <div class="guide-section-head">
            <span>Feature 01</span>
            <h2>Focus Timer</h2>
            <p>Open Focus Timer, choose a template, confirm the start options, and run the focus session.</p>
          </div>

          <figure class="manual-shot focus-flow-shot">
            <img src="/assets/user-guide/en/focus/focus-timer-flow.png?v=20260804-final4" alt="Four-step Focus Timer guide showing the main menu, template selection, start options, and a running focus session" loading="eager">
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
                <p>The large circle shows the current Focus time and the smaller circle shows the Break time. Use the bottom controls to pause or end the session.</p>
              </div>
            </article>
          </div>

          <div class="guide-callout tip">
            <h3>Focus Timer flow</h3>
            <p>Menu → Template → Repeat count and optional Loop link → Start Focus Timer → Running session.</p>
          </div>
        </section>'''

pattern = r'        <section class="guide-section" id="focus"(?:\s+[^>]*)?>.*?        </section>'
html, count = re.subn(pattern, section, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f'Expected one Focus section, replaced {count}.')

html_path.write_text(html, encoding='utf-8')
print('Published the final four-step Focus Timer section.')
