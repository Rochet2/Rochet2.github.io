#!/usr/bin/env python3
"""Generate WebP copies alongside JPG/PNG images in images/."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install -r script/requirements.txt", file=sys.stderr)
    sys.exit(2)

RASTER_SUFFIXES = {".jpg", ".jpeg", ".png"}


def webp_path(source: Path) -> Path:
    return source.with_name(f"{source.stem}.webp")


def needs_update(source: Path, destination: Path) -> bool:
    if not destination.is_file():
        return True
    return source.stat().st_mtime > destination.stat().st_mtime


def generate(source: Path, destination: Path, quality: int) -> None:
    with Image.open(source) as image:
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.save(destination, "WEBP", quality=quality, method=6)


def iter_sources(root: Path) -> list[Path]:
    sources = []
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() not in RASTER_SUFFIXES:
            continue
        sources.append(path)
    return sources


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if WebP derivatives are missing or older than their source",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=80,
        help="WebP quality (default: 80)",
    )
    parser.add_argument(
        "--images-dir",
        type=Path,
        default=Path("images"),
        help="Directory to scan (default: images)",
    )
    args = parser.parse_args()

    root = args.images_dir
    if not root.is_dir():
        print(f"Missing images directory: {root}", file=sys.stderr)
        return 1

    issues: list[str] = []
    generated = 0

    for source in iter_sources(root):
        destination = webp_path(source)

        if args.check:
            if not destination.is_file():
                issues.append(f"missing WebP derivative: {destination}")
            elif needs_update(source, destination):
                issues.append(f"stale WebP derivative: {destination}")
            continue

        if needs_update(source, destination):
            generate(source, destination, args.quality)
            generated += 1
            print(f"Generated {destination}")

    if issues:
        for issue in issues:
            print(issue, file=sys.stderr)
        return 1

    if args.check:
        print(f"WebP derivatives up to date ({len(iter_sources(root))} sources checked).")
    else:
        print(f"Done ({generated} generated, {len(iter_sources(root))} sources scanned).")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
