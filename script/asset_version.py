#!/usr/bin/env python3
"""Manage _data/assets.yml content hash for CSS/JS cache busting."""

from __future__ import annotations

import argparse
import hashlib
import re
import sys
from pathlib import Path

ASSET_FILES = (
    Path("css/style.css"),
    Path("css/github_markdown.css"),
    Path("js/gallery.js"),
)
OUTPUT = Path("_data/assets.yml")


def compute_version() -> str:
    hasher = hashlib.sha256()

    for path in ASSET_FILES:
        if not path.is_file():
            raise FileNotFoundError(path)
        hasher.update(path.read_bytes())
        hasher.update(b"\0")

    return hasher.hexdigest()[:8]


def read_version() -> str | None:
    if not OUTPUT.is_file():
        return None

    match = re.search(r'^assets_version:\s*"([0-9a-f]+)"\s*$', OUTPUT.read_text(encoding="utf-8"), re.MULTILINE)
    return match.group(1) if match else None


def write_version(version: str) -> None:
    OUTPUT.parent.mkdir(exist_ok=True)
    OUTPUT.write_text(f'assets_version: "{version}"\n', encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if _data/assets.yml is missing or does not match current CSS/JS files",
    )
    args = parser.parse_args()

    try:
        expected = compute_version()
    except FileNotFoundError as exc:
        print(f"Missing asset file: {exc}", file=sys.stderr)
        return 1

    if args.check:
        actual = read_version()
        if actual != expected:
            print(
                f"_data/assets.yml is out of date (have {actual!r}, expected {expected!r}). "
                "Run: python script/asset_version.py",
                file=sys.stderr,
            )
            return 1
        print(f"Asset version OK ({expected})")
        return 0

    write_version(expected)
    print(f"Wrote {OUTPUT} (assets_version: {expected})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
