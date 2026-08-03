from __future__ import annotations

from pathlib import Path
import re

HTML_PATH = Path("smart-planner/user-guide.html")
CSS_PATH = Path("assets/user-guide.css")

SECTION = '''        <section class="guide-section spaced-beginner" id="spaced-loop">
          <div class="guide-section-head">
            <span>Beginner 04</span>
            <h2>Create your first Spaced Loop</h2>
            <p>Use a Spaced Loop for a word, fact, or note you want to remember. Follow these four steps.</p>
          </div>

          <div class="spaced-quick-summary" aria-label="Four steps to create a Spaced Loop">
            <span><b>1</b> Start</span>
            <span><b>2</b> Add content</span>
            <span><b>3</b> Keep the pattern</span>
            <span><b>4</b> Save</span>
          </div>

          <div class="spaced-step-list">
            <article class="spaced-step-card">
              <div class="spaced-step-copy">
                <span class="spaced-step-number">1</span>
                <div>
                  <h3>Tap + Spaced Loop</h3>
                  <p>From Home, tap the blue <strong>+ Spaced Loop</strong> button.</p>
                </div>
              </div>
              <figure class="spaced-step-shot">
                <div class="spaced-shot-label">Tap here</div>
                <img src="/assets/user-guide/spaced/01-start.png" alt="Home screen with the Spaced Loop button" loading="lazy">
              </figure>
            </article>

            <article class="spaced-step-card">
              <div class="spaced-step-copy">
                <span class="spaced-step-number">2</span>
                <div>
                  <h3>Enter a title and note</h3>
                  <p>Use a short title. Put the answer or explanation in the note.</p>
                </div>
              </div>
              <figure class="spaced-step-shot">
                <div class="spaced-shot-label">Title and note</div>
                <img src="/assets/user-guide/spaced/02-content.png" alt="Spaced Loop title and note fields" loading="lazy">
              </figure>
            </article>

            <article class="spaced-step-card">
              <div class="spaced-step-copy">
                <span class="spaced-step-number">3</span>
                <div>
                  <h3>Keep the suggested pattern</h3>
                  <p>For your first Loop, leave the default review pattern unchanged.</p>
                </div>
              </div>
              <figure class="spaced-step-shot">
                <div class="spaced-shot-label">Default is fine</div>
                <img src="/assets/user-guide/spaced/03-pattern.png" alt="Spaced Loop review pattern" loading="lazy">
              </figure>
            </article>

            <article class="spaced-step-card">
              <div class="spaced-step-copy">
                <span class="spaced-step-number">4</span>
                <div>
                  <h3>Check the first reminder and save</h3>
                  <p>Confirm the first reminder time, then tap <strong>Save</strong>.</p>
                </div>
              </div>
              <figure class="spaced-step-shot">
                <div class="spaced-shot-label">Check and save</div>
                <img src="/assets/user-guide/spaced/04-save.png" alt="First reminder options and Save button" loading="lazy">
              </figure>
            </article>
          </div>

          <div class="guide-callout tip spaced-finished">
            <h3>Done</h3>
            <p>The Loop will appear on Home. When it is ready, try to remember the answer before opening the note.</p>
          </div>
        </section>'''

STYLES = r'''

/* Beginner Spaced Loop walkthrough */
.spaced-quick-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 0 0 24px;
}

.spaced-quick-summary span {
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 48px;
  padding: 10px 12px;
  border: 1px solid #dbe4ef;
  border-radius: 14px;
  background: #fff;
  color: #334155;
  font-size: 13px;
  font-weight: 800;
}

.spaced-quick-summary b,
.spaced-step-number {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #1677ff;
  color: #fff;
  font-weight: 900;
}

.spaced-step-list {
  display: grid;
  gap: 22px;
}

.spaced-step-card {
  display: grid;
  grid-template-columns: minmax(220px, .8fr) minmax(300px, 1.2fr);
  gap: 24px;
  align-items: start;
  padding: 22px;
  border: 1px solid #dbe4ef;
  border-radius: 24px;
  background: linear-gradient(145deg, #fff, #f7fbff);
  box-shadow: 0 16px 42px rgba(15, 23, 42, .07);
}

.spaced-step-copy {
  display: flex;
  gap: 14px;
  position: sticky;
  top: 104px;
}

.spaced-step-copy h3 {
  margin: 2px 0 8px;
  color: #111827;
  font-size: 21px;
}

.spaced-step-copy p {
  margin: 0;
  color: #64748b;
  line-height: 1.7;
}

.spaced-step-shot {
  position: relative;
  width: min(100%, 390px);
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #dbe4ef;
  border-radius: 20px;
  background: #f8fafc;
}

.spaced-step-shot img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid #e2e8f0;
  border-radius: 13px;
  background: #fff;
}

.spaced-shot-label {
  position: absolute;
  z-index: 2;
  top: 18px;
  left: 18px;
  padding: 7px 11px;
  border-radius: 999px;
  background: rgba(22, 119, 255, .94);
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  box-shadow: 0 8px 22px rgba(22, 119, 255, .28);
}

.spaced-finished {
  margin-top: 24px;
}

@media (max-width: 820px) {
  .spaced-quick-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spaced-step-card {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 18px;
  }

  .spaced-step-copy {
    position: static;
  }
}

@media (max-width: 480px) {
  .spaced-quick-summary {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .spaced-step-card {
    padding: 14px;
    border-radius: 20px;
  }

  .spaced-step-shot {
    width: 100%;
    padding: 6px;
    border-radius: 16px;
  }

  .spaced-shot-label {
    top: 13px;
    left: 13px;
  }

  .spaced-step-copy h3 {
    font-size: 19px;
  }
}
'''


def replace_section(html: str) -> str:
    pattern = re.compile(
        r'        <section class="guide-section(?: spaced-beginner)?" id="spaced-loop">.*?        </section>',
        re.S,
    )
    if not pattern.search(html):
        raise RuntimeError("Spaced Loop section not found")
    return pattern.sub(SECTION, html, count=1)


def replace_styles(css: str) -> str:
    marker = "/* Beginner Spaced Loop walkthrough */"
    if marker in css:
        css = css.split(marker, 1)[0].rstrip()
    return css + STYLES


def main() -> None:
    html = HTML_PATH.read_text(encoding="utf-8")
    css = CSS_PATH.read_text(encoding="utf-8")
    HTML_PATH.write_text(replace_section(html), encoding="utf-8")
    CSS_PATH.write_text(replace_styles(css), encoding="utf-8")


if __name__ == "__main__":
    main()
