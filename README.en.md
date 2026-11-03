# NekoTime — Cute Cat Clock

**Language / 语言:** [中文](README.md) · English

> A cross-platform floating desktop cat clock with fully customizable themes —
> swap them in like game mods.

[![Release](https://img.shields.io/github/v/release/redtidev1918/NekoTime)](https://github.com/redtidev1918/NekoTime/releases/latest)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)](docs/COMPATIBILITY.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-documentation-6366f1)](https://redtidev1918.github.io/NekoTime/)

<div align="center">
  <img src="docs/screenshots/demo.gif" alt="NekoTime demo" width="600">
</div>

<div align="center">

**[⬇ Download the latest release](https://github.com/redtidev1918/NekoTime/releases/latest)** · **[📖 Read the docs](https://redtidev1918.github.io/NekoTime/)**

</div>

NekoTime is a clock that lives on your desktop: it floats anywhere on screen,
stays out of the way, and can be reskinned entirely — a `theme.json` plus a few
digit GIFs is all it takes to make a new theme. Desktop platforms only; there
is no Android / iOS support.

## Highlights

**Extensible themes**
No coding required — edit a JSON file, add GIF digits, fonts, or backgrounds,
and reload from the tray menu to see the result instantly.

**Free-floating window**
Drag it anywhere and lock the position to prevent accidental moves; run it in
the desktop layer or keep it always on top.

**Transparency & frosted glass**
Five opacity levels (30%–100%), double-click to hide and bring it back from
the tray, plus a built-in Frosted Glass theme.

**Full tray control**
Themes, scale, opacity, window layer, position lock, and language are all
handled from the system tray menu.

**Cross-platform**
macOS 10.14+ · Windows 10 1809+ · Linux (GTK3).

## Demo

Adjusting opacity in real time:

<div align="center">
  <img src="docs/screenshots/transparency-demo.gif" alt="Opacity adjustment demo" width="600">
</div>

Free window scaling (0.75x–2.00x):

<div align="center">
  <img src="docs/screenshots/scale-demo.gif" alt="Window scaling demo" width="600">
</div>

## Install

Download the file for your platform from
[**Releases**](https://github.com/redtidev1918/NekoTime/releases/latest); every
release ships a `SHA256SUMS` file for verifying integrity. The
[docs download page](https://redtidev1918.github.io/NekoTime/download.html)
lists the same files.

| Platform | Download |
| --- | --- |
| Windows 10 1809+ | `NekoTime-Windows-v*.zip` |
| macOS 10.14+ | `NekoTime-macOS-v*.dmg` (recommended) or `.zip` |
| Linux x64 | `NekoTime-Linux-x64-v*.tar.gz` |

**Windows**: unzip and double-click `neko_time.exe`.

**macOS**: open the DMG and drag NekoTime into Applications. If macOS warns
that the developer cannot be verified, right-click the app and choose Open.

**Linux**: extract the archive and run the binary from the `bundle` folder.
Install the GTK3 runtime libraries first if they are missing (Debian/Ubuntu
example):

```bash
tar -xzf NekoTime-Linux-x64-v*.tar.gz
cd NekoTime-Linux-x64-v*/bundle
sudo apt install -y libgtk-3-0 libegl1 libgl1 libgles2
./neko_time
```

GNOME and KDE are recommended on Linux; compositors on Xfce, MATE, or i3wm
require extra setup — see
[LINUX_TROUBLESHOOTING.md](docs/LINUX_TROUBLESHOOTING.md).

## Getting started

Once launched, the clock appears on your desktop and the app lives in the
system tray (the menu bar on macOS).

| Action | How |
| --- | --- |
| Move | drag the clock while unlocked |
| Hide / show | double-click the clock to hide; tray menu → Hide/Show |
| Switch theme | tray menu → Theme |
| Scale | tray menu → Scale (0.75x–2.00x) |
| Opacity | tray menu → Opacity (30%–100%) |
| Window layer | tray menu → Layer (Desktop / Top) |
| Lock position | tray menu → Lock Position |

The interface follows your system language by default; switch between
Simplified Chinese and English in the tray menu → Language. More details in
[USAGE.md](docs/USAGE.md).

## Custom themes

A theme is a folder: `theme.json` describes the style, `digits/` holds the
digit GIFs, and fonts or background images are optional.

Three steps to your own theme:

1. Tray menu → Open Theme Folder;
2. Create a new folder based on the built-in `example_mod` and edit
   `theme.json`;
3. Tray menu → Reload Themes to see the result.

Platform-specific theme directories, the full list of config fields, and
worked examples:

- [THEMES.md](docs/THEMES.md) — directory layout and config fields
- [Theme guide](themes/THEME_GUIDE.md) — step-by-step theme authoring
- [Example theme](themes/example_mod/README.md) — a minimal starting point

## Documentation

| What you want to do | Docs |
| --- | --- |
| Download & install | [Releases](https://github.com/redtidev1918/NekoTime/releases/latest) · [docs download page](https://redtidev1918.github.io/NekoTime/download.html) |
| Daily use | [USAGE.md](docs/USAGE.md) |
| Build a theme | [THEMES.md](docs/THEMES.md) · [Theme guide](themes/THEME_GUIDE.md) |
| App config | [APP_CONFIG.md](docs/APP_CONFIG.md) |
| Build & troubleshoot | [BUILD_GUIDE.md](docs/BUILD_GUIDE.md) · [COMPATIBILITY.md](docs/COMPATIBILITY.md) · [LINUX_TROUBLESHOOTING.md](docs/LINUX_TROUBLESHOOTING.md) |
| Under the hood | [TECH_STACK.md](docs/TECH_STACK.md) · [TESTING.md](docs/TESTING.md) |

## Build from source

You need [Flutter 3.32](https://docs.flutter.dev/get-started/install) (Dart SDK
≥ 3.8.0) plus the toolchain for your platform; full setup instructions are in
[BUILD_GUIDE.md](docs/BUILD_GUIDE.md).

```bash
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime
flutter pub get
flutter run -d macos   # or -d windows / -d linux
```

```bash
make test          # full suite: unit + widget + analyze + format
make test-quick    # quick pass while developing
```

## Contributing

Issues and pull requests are welcome — please read
[CONTRIBUTING.md](CONTRIBUTING.md) first. Report security vulnerabilities via
[SECURITY.md](SECURITY.md).

## License

Released under the [MIT License](LICENSE).

## Acknowledgements

NekoTime builds on:

- [Flutter](https://flutter.dev): the cross-platform desktop UI framework.
- [window_manager](https://pub.dev/packages/window_manager) · [system_tray](https://pub.dev/packages/system_tray): window layering and tray menus.
- [flutter_acrylic](https://pub.dev/packages/flutter_acrylic): acrylic/blur window backgrounds.
- [shared_preferences](https://pub.dev/packages/shared_preferences): local settings persistence.
- [provider](https://pub.dev/packages/provider): state management.
- [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons): platform app icon generation.
