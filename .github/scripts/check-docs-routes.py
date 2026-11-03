"""Check local links and assets in the VitePress build, under the Pages base."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

DIST = Path("docs/.vitepress/dist")
BASE = "/NekoTime/"
LEGACY_HOMES = {"README.html", "en/README.html"}


class Page(HTMLParser):
    def __init__(self, file):
        super().__init__()
        self.urls = set()
        self.feed(file.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        self.urls.update(value for key, value in attrs if key in {"href", "src"} and value)


for route in ("index.html", "en/index.html", "download.html", "en/download.html",
              "themes/THEME_GUIDE.html", "README.html", "en/README.html"):
    if not (DIST / route).is_file():
        raise SystemExit(f"Missing built page: {route}")

errors = set()
for file in DIST.rglob("*.html"):
    route = file.relative_to(DIST).as_posix()
    for url in Page(file).urls:
        resolved = urlsplit(urljoin(BASE + route, url))
        if resolved.scheme or resolved.netloc:
            continue
        path = unquote(resolved.path)
        if not path.startswith(BASE):
            errors.add(f"{route}: link escapes Pages base: {url}")
            continue
        relative = path.removeprefix(BASE)
        if relative in LEGACY_HOMES:
            errors.add(f"{route}: link uses legacy home: {url}")
        target = DIST / (relative + "index.html" if path.endswith("/") else relative)
        if not target.is_file():
            errors.add(f"{route}: missing target: {url}")

if errors:
    raise SystemExit("\n".join(sorted(errors)))
print("Built pages, local links and assets passed")
