from pathlib import Path
import re

html_path = Path('smart-planner/user-guide.html')
html = html_path.read_text(encoding='utf-8')

focus = '''        <section class="guide-section" id="focus">
          <div class="guide-section-head">
            <span>Feature 01</span>
            <h2>Focus Timer</h2>
            <p>Use Focus Timer when you want a clear work period followed by a short break.</p>
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
                <figcaption>Use the main menu to open Focus Timer and other app features.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">2</span>
                <div>
                  <h3>Set the session</h3>
                  <p>Choose the focus duration and break duration you want. Review the settings, then tap the start control.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Session settings</div>
                <img src="/assets/user-guide/en/focus/01-setup.png" alt="Focus Timer setup screen" loading="lazy">
                <figcaption>You can adjust the session before starting. A shorter first session is often easier to complete.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">3</span>
                <div>
                  <h3>Run the timer</h3>
                  <p>The running screen shows the current timer stage and remaining time. Use the controls shown on the screen to manage the session.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Running session</div>
                <img src="/assets/user-guide/en/focus/02-running.png" alt="Focus Timer running screen" loading="lazy">
                <figcaption>Stay with the current task until the focus period finishes, then follow the break stage shown by the timer.</figcaption>
              </figure>
            </article>
          </div>

          <div class="guide-callout tip">
            <h3>Keep the first session simple</h3>
            <p>Choose one task before starting. Adjust the duration on the setup screen rather than adding more work during the session.</p>
          </div>
        </section>'''

pattern = r'        <section class="guide-section" id="focus">.*?        </section>'
html, count = re.subn(pattern, focus, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit('Focus section not found')

html_path.write_text(html, encoding='utf-8')
Path('assets/user-guide/en/focus/01-hub.png').unlink(missing_ok=True)
print('Focus Timer guide updated.')
