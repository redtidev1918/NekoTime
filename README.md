# NekoTime · 猫铃时钟

**语言 / Language:** 中文 · [English](README.en.md)

> 跨平台桌面悬浮猫娘时钟。支持像游戏 MOD 一样，自定义整套时钟主题。

[![Release](https://img.shields.io/github/v/release/redtidev1918/NekoTime)](https://github.com/redtidev1918/NekoTime/releases/latest)
[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)](docs/COMPATIBILITY.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3%E7%AB%99%E7%82%B9-6366f1)](https://redtidev1918.github.io/NekoTime/)

<div align="center">
  <img src="docs/screenshots/demo.gif" alt="NekoTime 演示" width="600">
</div>

<div align="center">

**[⬇ 下载最新版本](https://github.com/redtidev1918/NekoTime/releases/latest)** · **[📖 阅读文档](https://redtidev1918.github.io/NekoTime/)**

</div>

NekoTime 是一只住在桌面上的时钟：悬浮在屏幕任意角落，不挡操作，还能整套换装——一个 `theme.json` 加几张 GIF 数字，就是一个新主题。仅支持桌面平台，不支持 Android / iOS。

## 功能特色

**可扩展主题**
无需编程，修改 JSON 配置即可换肤；支持 GIF 数字动画、自定义字体与背景；改完一键重载，立即生效。

**自由悬浮**
按住即拖，可锁定位置防误触；窗口既可沉入桌面层，也可置顶显示。

**透明与毛玻璃**
透明度五档可调（30%–100%），双击隐藏、托盘唤回；内置 Frosted Glass 毛玻璃主题。

**完整托盘控制**
主题切换、缩放、透明度、层级、位置锁定、语言切换都在系统托盘菜单完成。

**跨平台**
macOS 10.14+ · Windows 10 1809+ · Linux（GTK3）。

## 界面效果

透明度实时调节：

<div align="center">
  <img src="docs/screenshots/transparency-demo.gif" alt="透明度调节演示" width="600">
</div>

窗口尺寸自由缩放（0.75x–2.00x）：

<div align="center">
  <img src="docs/screenshots/scale-demo.gif" alt="窗口缩放演示" width="600">
</div>

## 下载安装

前往 [**Releases**](https://github.com/redtidev1918/NekoTime/releases/latest) 下载对应平台的文件，每个版本附带 `SHA256SUMS` 可供校验完整性。也可以从[文档站下载页](https://redtidev1918.github.io/NekoTime/download.html)获取。

| 平台 | 下载文件 |
| --- | --- |
| Windows 10 1809+ | `NekoTime-Windows-v*.zip` |
| macOS 10.14+ | `NekoTime-macOS-v*.dmg`（推荐）或 `.zip` |
| Linux x64 | `NekoTime-Linux-x64-v*.tar.gz` |

**Windows**：解压 ZIP，双击 `neko_time.exe` 运行。

**macOS**：打开 DMG，将 NekoTime 拖入「应用程序」后启动。若系统提示无法验证开发者，右键点击应用并选择「打开」。

**Linux**：解压后进入 `bundle` 目录运行。首次启动如缺运行库，先安装 GTK3 相关依赖（Debian/Ubuntu 示例）：

```bash
tar -xzf NekoTime-Linux-x64-v*.tar.gz
cd NekoTime-Linux-x64-v*/bundle
sudo apt install -y libgtk-3-0 libegl1 libgl1 libgles2
./neko_time
```

Linux 桌面环境建议 GNOME / KDE；使用 Xfce、MATE、i3 等需要启用合成器，详见 [Linux 故障排查](docs/LINUX_TROUBLESHOOTING.md)。

## 快速上手

启动后时钟直接显示在桌面，程序图标驻留系统托盘（macOS 为菜单栏 🕐）。

| 操作 | 方式 |
| --- | --- |
| 移动位置 | 解锁状态下按住拖动 |
| 隐藏 / 显示 | 双击时钟隐藏，托盘菜单「隐藏/显示」唤回 |
| 切换主题 | 托盘菜单 → 主题 |
| 缩放 | 托盘菜单 → 缩放（0.75x–2.00x） |
| 透明度 | 托盘菜单 → 透明度（30%–100%） |
| 窗口层级 | 托盘菜单 → 显示层级（桌面层 / 置顶层） |
| 锁定位置 | 托盘菜单 → 锁定位置 |
| 打开设置 | 托盘菜单 → Settings |

界面语言默认跟随系统，可在托盘菜单 → 语言 中切换简体中文 / English。更多细节见[使用指南](docs/USAGE.md)。

## 自定义主题

一个主题就是一个文件夹：`theme.json` 描述样式，`digits/` 存放数字 GIF，还可加入字体与背景图。

三步上手：

1. 托盘菜单 → 打开主题文件夹（路径也可在 Settings 对话框中复制）；
2. 参考内置的 `example_mod` 新建主题文件夹，编辑 `theme.json`；
3. 托盘菜单 → 重新加载主题，立即查看效果。

各平台主题目录位置、配置字段说明与完整示例见：

- [主题系统](docs/THEMES.md) — 目录结构与字段说明
- [主题开发指南](themes/THEME_GUIDE.md) — 手把手制作主题
- [示例主题](themes/example_mod/README.md) — 可直接修改的最小示例

## 文档导航

| 你想做什么 | 文档 |
| --- | --- |
| 下载与安装 | [Releases](https://github.com/redtidev1918/NekoTime/releases/latest) · [文档站下载页](https://redtidev1918.github.io/NekoTime/download.html) |
| 日常使用 | [使用指南](docs/USAGE.md) |
| 制作主题 | [主题系统](docs/THEMES.md) · [主题开发指南](themes/THEME_GUIDE.md) |
| 调整配置 | [应用配置](docs/APP_CONFIG.md) |
| 构建与排障 | [构建指南](docs/BUILD_GUIDE.md) · [平台兼容性](docs/COMPATIBILITY.md) · [Linux 排查](docs/LINUX_TROUBLESHOOTING.md) |
| 了解技术 | [技术栈](docs/TECH_STACK.md) · [测试指南](docs/TESTING.md) |

## 从源码构建

需要 [Flutter 3.32](https://docs.flutter.dev/get-started/install)（Dart SDK ≥ 3.8.0）及对应平台的开发工具链，完整依赖说明见[构建指南](docs/BUILD_GUIDE.md)。

```bash
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime
flutter pub get
flutter run -d macos   # 或 -d windows / -d linux
```

```bash
make test          # 全量测试：单元 + Widget + 静态分析 + 格式检查
make test-quick    # 开发时快速测试
```

## 贡献

欢迎提交 Issue 与 Pull Request，请先阅读[贡献指南](CONTRIBUTING.md)；安全漏洞请通过[安全策略](SECURITY.md)报告。

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 致谢

NekoTime 建立在以下项目之上：

- [Flutter](https://flutter.dev)：跨平台桌面 UI 框架。
- [window_manager](https://pub.dev/packages/window_manager) · [system_tray](https://pub.dev/packages/system_tray)：窗口置顶、层级与托盘菜单。
- [flutter_acrylic](https://pub.dev/packages/flutter_acrylic)：窗口毛玻璃与亚克力背景。
- [shared_preferences](https://pub.dev/packages/shared_preferences)：本地设置持久化。
- [provider](https://pub.dev/packages/provider)：状态管理。
- [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons)：各平台应用图标生成。
