# RochetCode

GitHub Pages site for [rochet2.github.io](https://rochet2.github.io) — downloads and documentation for World of Warcraft emulator mods and tools.

## Editing the site

Most content lives in plain files. No build tools are required locally; GitHub Pages runs Jekyll when you push to `master`.

### Add or update a project

1. Create or edit a post in `_posts/` with front matter:

   ```yaml
   ---
   title: My Project
   description: Short summary used for search and social previews.
   ---
   ```

   The post filename date controls sort order on the downloads page.

2. Add a matching entry in `_data/projects.yml` (the key must match `title` exactly):

   ```yaml
   "My Project":
     tags: [trinity, cpp]
     downloads:
       - label: GitHub source
         url: https://github.com/Rochet2/...
   ```

3. Add an icon at `images/icon_My Project.png` (same naming pattern as existing projects).

4. Optional: add screenshots via an `images:` list in the post front matter.

See the comment at the top of `_data/projects.yml` for download and cache-busting details.

### URLs and sorting

Project pages use clean URLs based on the post title, not the filename date. With `permalink: none` in `_config.yml`, a post titled `Item enchant visuals` is published at `/Item-enchant-visuals.html` (Jekyll slugifies the title).

The date in the `_posts/` filename (for example `2013-04-21-Item Enchant Visuals.md`) is **not** part of the URL. It is still important because Jekyll uses it to sort posts. The downloads page lists projects in reverse date order (newest filename date first).

If you rename a post title, the public URL changes. Update any external links pointing at the old path.

### Site-hosted download files

SQL and other files in `downloads/` use a `version` field. Bump `version` when you change the file so browsers fetch the new copy:

```yaml
- label: TrinityCore
  url: /downloads/My_File.sql
  version: 2
```

### Local preview

If you have Ruby and Bundler installed:

```bash
gem install github-pages
jekyll serve
```

Otherwise push to a branch and check the GitHub Actions build, or review the deployed site after merge.

### Validation

CI runs `script/validate_site.py` before building. It checks:

- every post has a matching `projects.yml` entry (and vice versa)
- every post has a `description` in front matter
- local `/downloads/` files referenced in `projects.yml` exist
- every project has an `images/icon_{title}.png` file
- site source files do not use plain `http://` links

After the Jekyll build, CI verifies `_site/search.json`, `_site/sitemap.xml`, and `_site/feed.xml` exist.

### WebP gallery images

Gallery screenshots keep their original JPG/PNG files. Compressed WebP copies are generated alongside them and served via `<picture>` when available. Project pages use a vanilla JS slideshow (same auto-advance behavior as the old ResponsiveSlides carousel, without jQuery).

Optional post front matter `gallery_aspect` sets the carousel frame ratio when screenshots are not standard WoW captures (default `850 / 451`). Example for wide UI banners:

```yaml
gallery_aspect: 930 / 300
```

Regenerate derivatives after adding or changing images:

```bash
pip install -r script/requirements.txt
python script/generate_webp.py
```

CI runs `python script/generate_webp.py --check` to ensure WebP copies are present and up to date. Commit the generated `.webp` files with your image changes.

### CSS/JS cache busting

Run `python script/asset_version.py` after changing `css/style.css`, `css/github_markdown.css`, or `js/gallery.js`. It updates `_data/assets.yml`, which is committed to the repo so GitHub Pages can read it during its own Jekyll build.

CI runs `python script/asset_version.py --check` to ensure that file matches the current CSS/JS content (same idea as the WebP check).

```bash
python script/asset_version.py
```
