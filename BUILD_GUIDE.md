# NekoTime 构建指南

本文档详细说明如何在各个平台上构建和打包 NekoTime。

## 📋 目录

- [快速开始](#-快速开始)
- [macOS 构建](#-macos-构建)
- [Windows 构建](#-windows-构建)
- [Linux 构建](#-linux-构建)
- [自动化脚本](#-自动化脚本)
- [故障排除](#-故障排除)

## 🚀 快速开始

### 前置要求

**所有平台**：
- Flutter SDK 3.0 或更高版本
- Git

**平台特定**：
- **macOS**: Xcode 12.0+, CocoaPods
- **Windows**: Visual Studio 2019+（C++ 桌面开发）
- **Linux**: 构建工具链（见 [Linux 构建](#-linux-构建)）

### 克隆项目

```bash
git clone https://github.com/redtidev1918/NekoTime.git
cd NekoTime
flutter pub get
```

## 🍎 macOS 构建

### 方法 1：使用自动化脚本（推荐）

```bash
# 授予执行权限
chmod +x scripts/build_all.sh

# 构建并打包 macOS 版本
./scripts/build_all.sh macos
```

输出文件：`dist/NekoTime-macOS-v2.1.0.zip`

### 方法 2：手动构建

```bash
# 1. 清理
flutter clean
flutter pub get

# 2. 构建 Release 版本
flutter build macos --release

# 3. 应用程序位置
# build/macos/Build/Products/Release/NekoTime.app
```

### 创建 DMG 安装包（可选）

需要安装 `create-dmg`：

```bash
# 安装 create-dmg
brew install create-dmg

# 创建 DMG
create-dmg \
  --volname "NekoTime" \
  --window-pos 200 120 \
  --window-size 600 400 \
  --icon-size 100 \
  --icon "NekoTime.app" 175 120 \
  --hide-extension "NekoTime.app" \
  --app-drop-link 425 120 \
  "NekoTime-macOS-v2.1.0.dmg" \
  "build/macos/Build/Products/Release/NekoTime.app"
```

### 签名和公证（发布用）

```bash
# 代码签名
codesign --deep --force --verify --verbose \
  --sign "Developer ID Application: Your Name" \
  build/macos/Build/Products/Release/NekoTime.app

# 公证（需要 Apple 开发者账号）
xcrun notarytool submit NekoTime-macOS-v2.1.0.dmg \
  --apple-id "your@email.com" \
  --team-id "TEAM_ID" \
  --password "app-specific-password"
```

## 🪟 Windows 构建

### 方法 1：使用批处理脚本（推荐）

```batch
REM 在 Windows 命令提示符或 PowerShell 中运行
scripts\build_windows.bat
```

输出文件：`dist\NekoTime-Windows-v2.1.0.zip`

### 方法 2：手动构建

```batch
REM 1. 清理
flutter clean
flutter pub get

REM 2. 构建 Release 版本
flutter build windows --release

REM 3. 可执行文件位置
REM build\windows\x64\runner\Release\NekoTime.exe
```

### 创建安装程序

#### 使用 Inno Setup

1. 下载并安装 [Inno Setup](https://jrsoftware.org/isdl.php)

2. 创建 `setup.iss` 文件：

```pascal
[Setup]
AppName=NekoTime
AppVersion=2.1.0
DefaultDirName={pf}\NekoTime
DefaultGroupName=NekoTime
OutputDir=dist
OutputBaseFilename=NekoTime-Setup-v2.1.0
Compression=lzma2
SolidCompression=yes

[Files]
Source: "build\windows\x64\runner\Release\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\NekoTime"; Filename: "{app}\NekoTime.exe"
Name: "{commondesktop}\NekoTime"; Filename: "{app}\NekoTime.exe"

[Run]
Filename: "{app}\NekoTime.exe"; Description: "启动 NekoTime"; Flags: postinstall nowait skipifsilent
```

3. 编译：

```batch
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" setup.iss
```

#### 使用 NSIS

1. 安装 [NSIS](https://nsis.sourceforge.io/)

2. 创建 `installer.nsi`（Windows 兼容性说明见 [COMPATIBILITY.md](COMPATIBILITY.md)）

3. 编译：

```batch
makensis installer.nsi
```

### 代码签名（可选）

```batch
REM 需要代码签名证书
signtool sign /f YourCertificate.pfx /p YourPassword ^
  /t http://timestamp.digicert.com ^
  build\windows\x64\runner\Release\NekoTime.exe
```

## 🐧 Linux 构建

### 方法 1：使用Shell脚本（推荐）

```bash
# 授予执行权限
chmod +x scripts/build_linux.sh

# 构建并打包 Linux 版本
./scripts/build_linux.sh
```

输出文件：`dist/NekoTime-Linux-x64-v2.1.0.tar.gz`

### 方法 2：手动构建

```bash
# 1. 安装依赖（Ubuntu/Debian）
sudo apt-get update
sudo apt-get install -y \
    clang cmake ninja-build pkg-config \
    libgtk-3-dev liblzma-dev \
    libayatana-appindicator3-dev

# 2. 清理和构建
flutter clean
flutter pub get
flutter build linux --release

# 3. 可执行文件位置
# build/linux/x64/release/bundle/neko_time
```

### 创建 AppImage

1. 安装 `appimagetool`：

```bash
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage
```

2. 创建 AppDir 结构：

```bash
mkdir -p NekoTime.AppDir/usr/bin
mkdir -p NekoTime.AppDir/usr/lib
mkdir -p NekoTime.AppDir/usr/share/applications
mkdir -p NekoTime.AppDir/usr/share/icons/hicolor/256x256/apps

# 复制文件
cp -r build/linux/x64/release/bundle/* NekoTime.AppDir/usr/bin/
cp assets/icons/app_icon_source.png NekoTime.AppDir/usr/share/icons/hicolor/256x256/apps/nekotime.png

# 创建 .desktop 文件
cat > NekoTime.AppDir/usr/share/applications/nekotime.desktop << EOF
[Desktop Entry]
Name=NekoTime
Exec=neko_time
Icon=nekotime
Type=Application
Categories=Utility;
EOF

# 创建 AppRun
cat > NekoTime.AppDir/AppRun << 'EOF'
#!/bin/bash
SELF=$(readlink -f "$0")
HERE=${SELF%/*}
export PATH="${HERE}/usr/bin:${PATH}"
export LD_LIBRARY_PATH="${HERE}/usr/lib:${LD_LIBRARY_PATH}"
exec "${HERE}/usr/bin/neko_time" "$@"
EOF

chmod +x NekoTime.AppDir/AppRun

# 构建 AppImage
./appimagetool-x86_64.AppImage NekoTime.AppDir NekoTime-x86_64.AppImage
```

### 创建 .deb 包（Debian/Ubuntu）

```bash
# 创建包结构
mkdir -p nekotime_2.1.0-1_amd64/DEBIAN
mkdir -p nekotime_2.1.0-1_amd64/usr/bin
mkdir -p nekotime_2.1.0-1_amd64/usr/share/applications
mkdir -p nekotime_2.1.0-1_amd64/usr/share/icons/hicolor/256x256/apps

# 复制文件
cp -r build/linux/x64/release/bundle/* nekotime_2.1.0-1_amd64/usr/bin/
cp assets/icons/app_icon_source.png nekotime_2.1.0-1_amd64/usr/share/icons/hicolor/256x256/apps/nekotime.png

# 创建 control 文件
cat > nekotime_2.1.0-1_amd64/DEBIAN/control << EOF
Package: nekotime
Version: 2.1.0-1
Architecture: amd64
Maintainer: Your Name <your@email.com>
Description: NekoTime - 可爱的桌面时钟
 一款极致轻量、高度可定制的桌面悬浮时钟应用
Depends: libgtk-3-0, libayatana-appindicator3-1
EOF

# 创建 .desktop 文件
cat > nekotime_2.1.0-1_amd64/usr/share/applications/nekotime.desktop << EOF
[Desktop Entry]
Name=NekoTime
Exec=/usr/bin/neko_time
Icon=nekotime
Type=Application
Categories=Utility;
EOF

# 构建 .deb
dpkg-deb --build nekotime_2.1.0-1_amd64
```

## 🤖 自动化脚本

### 脚本说明

项目提供了三个构建脚本：

| 脚本 | 平台 | 用途 |
|------|------|------|
| `scripts/build_all.sh` | macOS/Linux | 跨平台构建脚本 |
| `scripts/build_windows.bat` | Windows | Windows 专用脚本 |
| `scripts/build_linux.sh` | Linux | Linux 专用脚本 |

### 使用示例

**macOS**：
```bash
# 构建 macOS 版本
./scripts/build_all.sh macos

# 创建源码包
./scripts/build_all.sh source

# 清理构建文件
./scripts/build_all.sh clean
```

**Windows**：
```batch
REM 构建 Windows 版本
scripts\build_windows.bat
```

**Linux**：
```bash
# 构建 Linux 版本
./scripts/build_linux.sh
```

### 脚本功能

所有脚本都会：
1. ✅ 清理旧构建
2. ✅ 安装依赖
3. ✅ 构建 Release 版本
4. ✅ 创建压缩包
5. ✅ 生成 README 文件
6. ✅ 显示构建信息

## 📦 发布检查清单

在发布新版本前，请确保完成以下检查：

### 代码检查

- [ ] 运行 `flutter analyze` 无错误
- [ ] 运行 `flutter test` 所有测试通过
- [ ] 更新 `pubspec.yaml` 中的版本号
- [ ] 更新 `CHANGELOG.md`

### 构建测试

- [ ] macOS 构建成功
- [ ] Windows 构建成功
- [ ] Linux 构建成功
- [ ] 所有平台功能测试通过

### 文档更新

- [ ] 更新 README.md 版本信息
- [ ] 更新 CHANGELOG.md 添加新版本
- [ ] 检查所有文档链接有效

### 打包验证

- [ ] macOS .app 可正常运行
- [ ] Windows .exe 可正常运行
- [ ] Linux 可执行文件正常运行
- [ ] 所有依赖已正确打包
- [ ] 主题文件夹路径正确
- [ ] 配置持久化正常

### 发布准备

- [ ] 创建 Git tag
- [ ] 准备 Release Notes
- [ ] 上传所有平台安装包
- [ ] 病毒扫描（VirusTotal）
- [ ] 签名验证（如适用）

## 🔧 故障排除

### macOS

**问题：Xcode 构建失败**
```bash
# 清理 Xcode 缓存
cd macos
pod deintegrate
pod install
cd ..
flutter clean
flutter build macos --release
```

**问题：签名错误**
```bash
# 检查证书
security find-identity -v -p codesigning

# 移除旧签名
codesign --remove-signature build/macos/Build/Products/Release/NekoTime.app
```

### Windows

**问题：CMake 错误**
```batch
REM 清理并重新生成
flutter clean
rd /s /q build
flutter pub get
flutter build windows --release
```

**问题：缺少 DLL**
```
确保使用 --release 构建
检查 build\windows\x64\runner\Release 目录
所有依赖 DLL 应该在该目录中
```

### Linux

**问题：GTK 错误**
```bash
# 重新安装 GTK 依赖
sudo apt-get install --reinstall libgtk-3-dev

# 检查 pkg-config
pkg-config --modversion gtk+-3.0
```

**问题：缺少共享库**
```bash
# 检查依赖
ldd build/linux/x64/release/bundle/neko_time

# 安装缺失的库
sudo apt-get install <missing-library>
```

### 通用问题

**问题：Flutter 版本不兼容**
```bash
# 检查 Flutter 版本
flutter --version

# 升级 Flutter
flutter upgrade

# 切换到稳定版
flutter channel stable
flutter upgrade
```

**问题：依赖冲突**
```bash
# 清理依赖缓存
flutter pub cache repair

# 重新获取依赖
rm pubspec.lock
flutter pub get
```

## 📊 构建时间参考

| 平台 | 首次构建 | 增量构建 | 清理构建 |
|------|----------|----------|----------|
| macOS | ~2-3 分钟 | ~30-60 秒 | ~2-3 分钟 |
| Windows | ~3-5 分钟 | ~1-2 分钟 | ~3-5 分钟 |
| Linux | ~2-4 分钟 | ~30-90 秒 | ~2-4 分钟 |

*时间取决于硬件配置和网络速度*

## 🎯 最佳实践

1. **使用 Release 构建**：发布时始终使用 `--release` 标志
2. **清理构建**：重大更改后执行 `flutter clean`
3. **依赖管理**：定期运行 `flutter pub upgrade` 更新依赖
4. **版本控制**：使用 Git tags 标记发布版本
5. **自动化**：使用提供的脚本自动化构建流程
6. **测试**：在目标平台上实际测试构建产物

## 📚 相关文档

- [README.md](README.md) - 项目概述
- [COMPATIBILITY.md](COMPATIBILITY.md) - 各平台兼容性说明
- [docs/LINUX_TROUBLESHOOTING.md](docs/LINUX_TROUBLESHOOTING.md) - Linux 常见问题排查
- [APP_CONFIG.md](APP_CONFIG.md) - 应用配置说明
- [CHANGELOG.md](CHANGELOG.md) - 更新日志

---

**最后更新**: 2025-11-18  
**适用版本**: v2.1.0+
