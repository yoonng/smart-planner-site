#!/usr/bin/env python3
"""Static public-copy checks for Feathly website pages."""

from __future__ import annotations

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN = (
    "Early Supporter PRO",
    "PODO",
    "Pomodoro",
    "POMODORO",
    "포모도로",
    "집중 타이머",
)
REQUIRED_FILES = {
    ROOT / "smart-planner" / "pro.html": (
        "Feathly Pro Lifetime",
        "Early Supporter",
        "separate small fee",
    ),
    ROOT / "ko" / "smart-planner" / "pro.html": (
        "Feathly Pro Lifetime",
        "얼리 서포터",
        "소액 요금",
    ),
    ROOT / "smart-planner" / "index.html": (
        "Feathly - Smart Planner",
        "Focus Timer",
        "Feathly Pro Lifetime",
    ),
}


def main() -> int:
    failed = 0
    html_files = list(ROOT.glob("**/*.html"))
    for path in html_files:
        text = path.read_text(encoding="utf-8")
        for token in FORBIDDEN:
            if token in text:
                print(f"FAIL {path.relative_to(ROOT)} contains {token!r}")
                failed += 1
    for path, needles in REQUIRED_FILES.items():
        if not path.exists():
            print(f"FAIL missing {path.relative_to(ROOT)}")
            failed += 1
            continue
        text = path.read_text(encoding="utf-8")
        for needle in needles:
            if needle not in text:
                print(f"FAIL {path.relative_to(ROOT)} missing {needle!r}")
                failed += 1
    if failed:
        print(f"{failed} public-copy check(s) failed")
        return 1
    print(f"PASS {len(html_files)} html files, no forbidden public tokens")
    return 0


if __name__ == "__main__":
    sys.exit(main())
