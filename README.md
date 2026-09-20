# NekoTime - 猫铃时钟

**语言 / Language:** 中文 · [English](README.en.md)

📖 完整文档：<https://redtidev1918.github.io/NekoTime/>

[![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue)](https://flutter.dev)
[![Flutter](https://img.shields.io/badge/Flutter-3.32-02569B?logo=flutter)](https://flutter.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Docs](https://img.shields.io/badge/Docs-文档站点-6366f1?style=flat-square)](https://redtidev1918.github.io/NekoTime/)

<div align="center">
  <img src="docs/screenshots/demo.gif" alt="NekoTime Demo" width="600">
</div>

NekoTime 是一个跨平台的桌面悬浮时钟，支持 macOS、Windows 和 Linux。它提供可扩展的主题系统，可以像给游戏打 MOD 一样替换时钟样式。

本项目面向桌面端，不支持移动端（Android / iOS）。

## 目录

- [特性](#特性)
- [快速开始](#快速开始)
- [使用指南](#使用指南)
- [主题系统](#主题系统)
- [技术栈](#技术栈)
- [更新日志](#更新日志)
- [测试](#测试)
- [贡献](#贡献)
- [许可证](#许可证)

## 特性

### 主题

- 无需编程，修改 JSON 配置即可
- 支持 GIF 动画、图片、自定义字体和背景
- 修改后点击重载即可看到效果
- 内置多款主题

### 窗口控制

- 系统级透明，不遮挡壁纸
- 毛玻璃背景模糊
- 分层管理：可置顶，也可沉浸在桌面
- 自由拖拽
- 锁定位置，防止误触
- 可调透明度，双击隐藏

<div align="center">
  <img src="docs/screenshots/transparency-demo.gif" alt="透明度调节演示" width="600">
  <p><em>透明度实时调节</em></p>
</div>

<div align="center">
  <img src="docs/screenshots/scale-demo.gif" alt="窗口缩放演示" width="600">
  <p><em>窗口尺寸自由缩放</em></p>
</div>

### 性能

- 资源占用低
- 动画平滑
- 自动缓存资源

### 语言支持

- 简体中文与 English，自动切换

## 快速开始

### 环境要求

- **Flutter 3.32**（Dart SDK `>=3.8.0`，见 `pubspec.yaml`）
- 按 [Flutter 官方文档](https://docs.flutter.dev/get-started/install) 配置对应平台开发环境

**平台特定依赖**：

<details>
<summary><b>macOS</b></summary>

- macOS 10.14 或更高版本
- Xcode 12.0 或更高版本
- CocoaPods

```bash
# 安装 CocoaPods（如未安装）
sudo gem install cocoapods
```
</details>

<details>
<summary><b>Windows</b></summary>

- Windows 10 1809 或更高版本（建议 Windows 10 1903+ 以获得最佳透明效果）
- Visual Studio 2019 或更高版本（包含 C++ 桌面开发工具）
- 启用开发者模式
</details>

<details>
<summary><b>Linux</b></summary>

#### 下载运行版（推荐）

从 [Releases](https://github.com/redtidev1918/NekoTime/releases) 下载最新版本后：

```bash
# 1. 解压并进入 bundle 目录
tar -xzf NekoTime-Linux-x64-v*.tar.gz
cd NekoTime-Linux-x64-v*/bundle

# 2. 安装运行时依赖（首次运行必需，Debian/Ubuntu 示例）
sudo apt install -y libgtk-3-0 libegl1 libgl1 libgles2

# 3. 启动应用
./neko_time
```

#### 从源码构建

**Ubuntu/Debian**：
```bash
sudo apt-get update
sudo apt-get install -y \
    clang cmake ninja-build pkg-config \
    libgtk-3-dev liblzma-dev \
    libayatana-appindicator3-dev
```

**Fedora**：
```bash
sudo dnf install -y \
    clang cmake ninja-build \
    gtk3-devel lzma-devel \
    libayatana-appindicator-gtk3-devel
```

**Arch Linux**：
```bash
sudo pacman -S base-devel gtk3 cmake ninja
```

#### 常见问题

更多 Linux 问题排查见 [docs/LINUX_TROUBLESHOOTING.md](docs/LINUX_TROUBLESHOOTING.md)。

**黑屏或 "No rendering surface available"**
```bash
# 运行依赖安装脚本
sudo ./scripts/install_linux_deps.sh

# 或手动安装运行时库
sudo apt install libgtk-3-0 libegl1 libgl1 libgles2
```
</details>

### 运行应用

```bash
# 克隆项目
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime

# 安装依赖
flutter pub get

# 运行 (macOS 示例)
flutter run -d macos

# 构建发行版
flutter build macos --release
```

构建产物位置：
- **macOS**: `build/macos/Build/Products/Release/NekoTime.app`
- **Windows**: `build/windows/x64/runner/Release/`
- **Linux**: `build/linux/x64/release/bundle/`

各平台的详细构建与部署说明见 [COMPATIBILITY.md](docs/COMPATIBILITY.md)。

## 更新日志

完整的版本历史与更新说明见 [CHANGELOG.md](CHANGELOG.md)。

## 文档

README 只讲怎么上手；用法、主题开发与技术栈在文档站 <https://redtidev1918.github.io/NekoTime/>：

| 你想做什么 | 文档 |
| --- | --- |
| 日常使用 | [使用指南](docs/USAGE.md) |
| 做一套自己的主题 | [主题系统](docs/THEMES.md) · [主题开发指南](themes/THEME_GUIDE.md) |
| 改配置 | [应用配置](docs/APP_CONFIG.md) |
| 自己构建 / 排查 | [构建指南](docs/BUILD_GUIDE.md) · [兼容性](docs/COMPATIBILITY.md) · [Linux 排查](docs/LINUX_TROUBLESHOOTING.md) |
| 参与开发 | [技术栈](docs/TECH_STACK.md) · [测试指南](docs/TESTING.md) |


## 测试

NekoTime 包含完整的测试套件，确保代码质量和稳定性。

### 快速测试

```bash
# 运行所有测试
make test

# 快速测试（开发时）
make test-quick

# 生成覆盖率报告
make test-coverage
```

### 测试类型

- **单元测试** - 测试核心功能和服务
- **Widget 测试** - 测试 UI 组件
- **代码分析** - 静态代码检查
- **格式检查** - 代码风格验证

### 详细文档

- [测试指南](docs/TESTING.md) - 完整的测试文档和最佳实践
- [工具脚本](tool/README.md) - 测试和构建脚本说明

## 贡献

欢迎提交 Issue 和 Pull Request。

### 开发规范

- 遵循 Flutter 官方代码风格
- 提交前运行 `make test` 或 `./tool/run_tests.sh`
- 确保所有测试通过
- 保持测试覆盖率 ≥ 70%
- 重大功能请先开 Issue 讨论

### 开发工作流

```bash
# 1. 克隆项目
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime

# 2. 获取依赖
make get

# 3. 运行测试
make test-quick

# 4. 运行应用
make run-macos  # 或 run-windows / run-linux

# 5. 提交前检查
make pre-release
```

## 许可证

本项目采用 [MIT License](LICENSE) 开源协议。
