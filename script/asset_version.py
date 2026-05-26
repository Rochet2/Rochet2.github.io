#!/usr/bin/env python3
"""Write _data/assets.yml with a content hash for CSS/JS cache busting."""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path

ASSET_FILES = (
    Path("css/style.css"),
    Path("css/github_markdown.css"),
    Path("js/gallery.js"),
)
OUTPUT = Path("_data/assets.yml")


def main() -> int:
    hasher = hashlib.sha256()

    for path in ASSET_FILES:
        if not path.is_file():
            print(f"Missing asset file: {path}", file=sys.stderr)
            return 1
        hasher.update(path.read_bytes())
        hasher.update(b"\0")

    version = hasher.hexdigest()[:8]
    OUTPUT.parent.mkdir(exist_ok=True)
    OUTPUT.write_text(f'assets_version: "{version}"\n', encoding="utf-8")
    print(f"Wrote {OUTPUT} (assets_version: {version})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
