#!/usr/bin/env python3
"""Validate RochetCode site source before Jekyll builds."""

from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Install PyYAML: pip install -r script/requirements.txt", file=sys.stderr)
    sys.exit(2)

SCAN_PATTERNS = [
    "_data/projects.yml",
    "_posts/*.md",
    "_layouts/*.html",
    "index.html",
    "contact/index.html",
    "downloads/index.html",
]


def insecure_http(line: str) -> bool:
    return "http://" in line.replace("https://", "")


def front_matter(path: Path) -> str | None:
    content = path.read_text(encoding="utf-8").replace("\r", "")
    if not content.startswith("---\n"):
        return None

    end_idx = content.find("\n---\n", 4)
    if end_idx < 0:
        return None

    return content[4:end_idx]


def post_title(path: Path) -> str | None:
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("title:"):
            return line.split(":", 1)[1].strip()
    return None


def main() -> int:
    errors: list[str] = []

    projects_path = Path("_data/projects.yml")
    projects = yaml.safe_load(projects_path.read_text(encoding="utf-8"))

    post_paths = sorted(Path("_posts").glob("*.md"))
    post_titles = [title for path in post_paths if (title := post_title(path))]

    for key in projects:
        if key not in post_titles:
            errors.append(f"projects.yml entry without a matching post title: {key}")

    for title in post_titles:
        if title not in projects:
            errors.append(f"Post without a matching projects.yml entry: {title}")

    for path in post_paths:
        fm = front_matter(path)
        if not fm or not re.search(r"^description:\s*\S", fm, re.MULTILINE):
            errors.append(f"Missing or empty description in front matter: {path}")

    for title, data in projects.items():
        if not isinstance(data, dict):
            continue
        for download in data.get("downloads") or []:
            url = download.get("url")
            if not url or "://" in url:
                continue
            local_path = Path(str(url).lstrip("/"))
            if not local_path.is_file():
                label = download.get("label", "download")
                errors.append(f"Missing download file {local_path} ({title}: {label})")

    for title in post_titles:
        icon_path = Path(f"images/icon_{title}.png")
        if not icon_path.is_file():
            errors.append(f"Missing project icon: {icon_path}")

    for pattern in SCAN_PATTERNS:
        for file_path in sorted(Path().glob(pattern)):
            for index, line in enumerate(
                file_path.read_text(encoding="utf-8").splitlines(), start=1
            ):
                if insecure_http(line):
                    errors.append(
                        f"{file_path}:{index} uses http:// (use https:// where possible)"
                    )

    if errors:
        print("Site validation failed:", file=sys.stderr)
        for message in errors:
            print(f"  - {message}", file=sys.stderr)
        return 1

    print(
        f"Validated {len(projects)} projects, {len(post_titles)} posts, "
        "icons, downloads, descriptions, and URLs."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
