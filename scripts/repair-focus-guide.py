from __future__ import annotations

import re
import shutil
from pathlib import Path

from PIL import Image

HTML_PATH = Path("smart-planner/user-guide.html")
SOURCE_IMAGES = [
    Path("assets/user-guide/en/menu/01-main-menu.png"),
    Path("assets/user-guide/en/focus/01-setup.png"),
    Path("assets/user-guide/en/focus/02-running.png"),
]
BROKEN_COMPOSITE = Path("assets/user-guide/en/focus/focus-timer-flow.webp")

for image_path in SOURCE_IMAGES:
    if not image_path.exists():
        raise SystemExit(f"Required image is missing: {image_path}")
    with Image.open(image_path) as image:
        image.verify()
    with Image.open(image_path) as image:
        print(f"VALID {image_path}: {image.format} {image.size[0]}x{image.size[1]}")

html = HTML_PATH.read_text(encoding="utf-8")
focus_section = '''        <section class="guide-section" id="focus" data-focus-guide-build="20260804-verified-png">
          <div class="guide-section-head">
            <span>Feature 01</span>
            <h2>Focus Timer</h2>
            <p>Open Focus Timer, choose the session settings, and then run the focus session.</p>
          </div>

          <div class="manual-step-list">
            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">1</span>
                <div>
                  <h3>Open Focus Timer</h3>
                  <p>From Home, open the main menu and tap <strong>Focus Timer</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Main menu</div>
                <img src="/assets/user-guide/en/menu/01-main-menu.png?v=20260804" alt="Feathly main menu with Focus Timer available" loading="lazy">
                <figcaption>Select Focus Timer from the main menu.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">2</span>
                <div>
                  <h3>Choose the session settings</h3>
                  <p>Select a template, set the repeat count, optionally link a Loop, and tap <strong>Start Focus Timer</strong>.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Focus setup</div>
                <img src="/assets/user-guide/en/focus/01-setup.png?v=20260804" alt="Focus Timer setup screen with template and session options" loading="lazy">
                <figcaption>Review the session options before starting.</figcaption>
              </figure>
            </article>

            <article class="manual-step-card">
              <div class="manual-step-copy">
                <span class="manual-step-number">3</span>
                <div>
                  <h3>Run the focus session</h3>
                  <p>The timer shows the current focus block. Use the controls to pause or end the session.</p>
                </div>
              </div>
              <figure class="manual-shot manual-step-shot">
                <div class="routine-step-badge">Running session</div>
                <img src="/assets/user-guide/en/focus/02-running.png?v=20260804" alt="Focus Timer running session screen" loading="lazy">
                <figcaption>Follow the focus and break cycle shown on screen.</figcaption>
              </figure>
            </article>
          </div>

          <div class="guide-callout tip">
            <h3>Focus Timer flow</h3>
            <p>Menu → Session settings → Start Focus Timer → Running session.</p>
          </div>
        </section>'''

pattern = r'        <section class="guide-section" id="focus"(?:\s+[^>]*)?>.*?        </section>'
html, count = re.subn(pattern, focus_section, html, count=1, flags=re.S)
if count != 1:
    raise SystemExit(f"Expected exactly one Focus section, replaced {count}.")
HTML_PATH.write_text(html, encoding="utf-8")

if BROKEN_COMPOSITE.exists():
    BROKEN_COMPOSITE.unlink()
    print(f"REMOVED {BROKEN_COMPOSITE}")

for path in [
    Path(".tmp/focus-image"),
]:
    if path.is_dir():
        shutil.rmtree(path)
        print(f"REMOVED {path}")

for path in [
    Path(".guide-trigger"),
    Path(".github/workflows/convert-focus-guide-to-png.yml"),
    Path(".github/workflows/fix-focus-image-format.yml"),
    Path("scripts/fix-focus-image-format.py"),
]:
    if path.exists():
        path.unlink()
        print(f"REMOVED {path}")

print("Focus guide repaired with verified PNG assets.")
