from pathlib import Path
import re

path = Path('smart-planner/user-guide.html')
html = path.read_text(encoding='utf-8')

focus = '''        <section class="guide-section" id="focus">
          <div class="guide-section-head">
            <span>Feature 01</span>
            <h2>Focus Timer</h2>
            <p>Choose a Focus Timer template, review its start options, and then begin the session.</p>
          </div>

          <div class="manual-step-list">
            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">1</span>
                <div>
                  <h3>Open Focus Timer</h3>
                  <p>From Home, tap the top-left <strong>Menu</strong>, then select <strong>Focus Timer</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Main menu</div>
                <img src="/assets/user-guide/en/menu/01-main-menu.png" alt="Feathly main menu with Focus Timer available" loading="lazy">
                <figcaption>Select Focus Timer from the main menu.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">2</span>
                <div>
                  <h3>Choose a template</h3>
                  <p>The Focus Timer opens to your template list. Find the template you want and tap its <strong>triangle play button</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Template list</div>
                <img src="/assets/user-guide/en/focus/01-setup.png" alt="Focus Timer template list with play controls" loading="lazy">
                <figcaption>Use the triangle button on a template to open its start options.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">3</span>
                <div>
                  <h3>Set repeats and start</h3>
                  <p>Choose how many times the template should repeat. When useful, link the focus session to a Loop, then tap the start control to begin the timer.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Start options</div>
                <img src="/assets/user-guide/en/focus/02-running.png" alt="Focus Timer start options for repeat count and optional Loop link" loading="lazy">
                <figcaption>Repeat count is required for the session. Linking a Loop is optional.</figcaption>
              </figure>
            </article>
          </div>

          <div class="guide-callout tip">
            <h3>Template first, session options second</h3>
            <p>Select the template before choosing its repeat count or linking a Loop. The timer starts only after you confirm these start options.</p>
          </div>
        </section>'''

pattern = r'        <section class="guide-section" id="focus">.*?        </section>'
html, count = re.subn(pattern, focus, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit('Focus section not found')

path.write_text(html, encoding='utf-8')
print('Corrected Focus Timer guide flow.')
