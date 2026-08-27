# NekoTime — Cute Cat Clock

[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)](https://flutter.dev)
[![Flutter](https://img.shields.io/badge/Flutter-3.27-02569B?logo=flutter)](https://flutter.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A cute, lightweight desktop floating clock with customizable GIF themes for
**macOS, Windows, and Linux**. The theme system works like game mods — drop a
theme folder in, reload, and your clock looks completely different.

> **Note**: desktop only — no Android/iOS support.

## Features

- **Themes**: JSON-configurable, no coding required; GIF animations, custom
  images, fonts, and backgrounds; instant reload; several built-in themes
- **Window**: fully transparent / frosted-glass blur, always-on-top or
  desktop-embedded layers, free dragging, position lock, adjustable opacity,
  double-click to hide
- **Performance**: lightweight, smooth animations, automatic resource caching
- **Language**: Simplified Chinese and English, auto-detected

## Quick start

Download the latest release from
[Releases](https://github.com/redtidev1918/NekoTime/releases), or build from
source:

```bash
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime
flutter pub get
flutter run -d macos    # or -d windows / -d linux
```

Platform setup, build output locations, and Linux runtime dependencies are in
[BUILD_GUIDE.md](BUILD_GUIDE.md) and [COMPATIBILITY.md](COMPATIBILITY.md);
Linux troubleshooting is in
[docs/LINUX_TROUBLESHOOTING.md](docs/LINUX_TROUBLESHOOTING.md).

## Usage

| Action | How |
| --- | --- |
| Drag | hold and drag the clock (unlock first) |
| Hide | double-click the clock, or tray menu → Hide |
| Show | click the tray icon and choose Show |
| Settings | right-click the tray icon → Settings |

The tray menu switches themes, window layer, scale (0.75x–2.0x), opacity,
locks position, reloads themes, and quits.

## Theme system

Themes live in the `themes/` folder of the app support directory (copy the
path from the Settings dialog). Each theme is a folder with a `theme.json`
plus digit images and optional assets. Full reference:
[themes/THEME_GUIDE.md](themes/THEME_GUIDE.md).

## Testing & contributing

- `make test` runs the full suite (unit + widget + analyze + format)
- See [CONTRIBUTING.md](CONTRIBUTING.md), [TESTING.md](TESTING.md), and
  [CHANGELOG.md](CHANGELOG.md)

## License

[MIT](LICENSE)

---

<p align="center"><strong>NekoTime — make time cuter 🐱⏰</strong></p>
