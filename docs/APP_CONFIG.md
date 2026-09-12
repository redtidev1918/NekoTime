# NekoTime 应用配置说明

## 应用名称说明

### 包名 vs 显示名称

- **包名（Package Name）**: `neko_time`
  - 定义在 `pubspec.yaml`
  - 用于代码、构建系统、内部标识
  - 本项目已从 `digital_clock` 重命名为 `neko_time`

- **显示名称（Display Name）**: `NekoTime`
  - 用户看到的应用名称
  - 在各平台配置文件中设置

### 各平台配置

#### macOS
- **配置文件**: `macos/Runner/Info.plist`
- **关键字段**:
  ```xml
  <key>CFBundleDisplayName</key>
  <string>NekoTime</string>
  ```
- **应用文件名**: `NekoTime.app`
- **用户看到**: `NekoTime`（在 Dock、Launchpad、应用程序文件夹）

#### Windows
- **配置文件**: `windows/runner/Runner.rc`
- **可执行文件**: `NekoTime.exe`
- **显示名称**: 需在 Windows 资源文件中配置

#### Linux
- **配置文件**: `.desktop` 文件
- **可执行文件**: `neko_time`
- **显示名称**: 在 .desktop 文件的 `Name` 字段

---

## 应用图标配置

### 主图标文件

**源文件**: `assets/icons/source.png`
- 这是项目的主要图标
- 像素风格猫耳朵图标
- 用于所有平台

### 各平台图标位置

#### macOS
- **位置**: `macos/Runner/Assets.xcassets/AppIcon.appiconset/`
- **文件**:
  - `app_icon_16.png` (16x16)
  - `app_icon_32.png` (32x32)
  - `app_icon_64.png` (64x64)
  - `app_icon_128.png` (128x128)
  - `app_icon_256.png` (256x256)
  - `app_icon_512.png` (512x512)
  - `app_icon_1024.png` (1024x1024)

**自动生成**: `scripts/build_all.sh macos` 会自动从 `source.png` 生成所有尺寸

#### Windows
- **位置**: `windows/runner/resources/`
- **文件**: `app_icon.ico`
- **生成**: 需要使用工具将 PNG 转换为 ICO

#### Linux
- **位置**: 应用程序图标由 .desktop 文件指定
- **文件**: 可以使用 `source.png` 或转换后的版本

---

## 构建脚本说明

### 主构建脚本

**`scripts/build_all.sh`**
- 统一的跨平台构建脚本
- 自动更新 macOS 图标
- 创建 DMG 和 ZIP 安装包

用法：
```bash
./scripts/build_all.sh macos    # 构建 macOS
./scripts/build_all.sh all      # 构建当前平台
```

### 平台专用脚本

- **`scripts/build_windows.bat`** - Windows 批处理脚本
- **`scripts/build_linux.sh`** - Linux Shell 脚本

---

## 输出文件命名

### macOS
- **DMG**: `NekoTime-v2.3.4.dmg`
- **ZIP**: `NekoTime-macOS-v2.3.4.zip`
- **应用**: `NekoTime.app`
- **用户看到**: `NekoTime`

### Windows
- **ZIP**: `NekoTime-Windows-v2.3.4.zip`
- **EXE**: `NekoTime.exe`
- **安装包**: `NekoTime-Setup-v2.3.4.exe`（如果创建）

### Linux
- **TAR.GZ**: `NekoTime-Linux-x64-v2.3.4.tar.gz`
- **可执行文件**: `neko_time`
- **AppImage**: `NekoTime-x86_64.AppImage`（如果创建）

---

## 修改应用显示名称

### macOS

编辑 `macos/Runner/Info.plist`：
```xml
<key>CFBundleDisplayName</key>
<string>NekoTime</string>
```

### Windows

1. 编辑 `windows/runner/Runner.rc`
2. 修改 `PRODUCT_NAME` 资源字符串
3. 重新编译

### Linux

创建/编辑 `.desktop` 文件：
```desktop
[Desktop Entry]
Name=NekoTime
Exec=neko_time
Icon=nekotime
Type=Application
```

---

## 常见问题

### Q: 为什么 macOS 文件名是 NekoTime.app 而包名是 neko_time？

**A**: 这是 Flutter 项目的常规命名约定：
- **包名**（neko_time）= Dart 包管理规范，使用下划线
- **应用名**（NekoTime）= 用户界面显示名称

示例：
- Google Chrome.app 的内部名称可能是 com.google.Chrome
- Microsoft Word.app 的包标识符是 com.microsoft.Word

### Q: 项目已经重命名为 neko_time

本项目已从 `digital_clock` 重命名为 `neko_time`，涉及：
1. 修改 `pubspec.yaml` 的 `name` 字段
2. 更新所有 `import 'package:neko_time/...'`
3. 修改所有平台配置文件
4. 更新应用显示名称为 NekoTime
5. 更新 Bundle ID/包名为 com.nekotime.app

### Q: 为什么数据目录路径变了？

**A**: 重命名后，应用数据目录使用新的 Bundle ID。实际路径取决于安装方式：

| 平台 | 路径 |
|------|------|
| macOS (Sandbox) | `~/Library/Containers/com.nekotime.app/Data/Library/Application Support/com.nekotime.app/` |
| macOS (非 Sandbox) | `~/Library/Application Support/NekoTime/` |
| Windows | `%APPDATA%\com.nekotime.app\` |
| Linux | `~/.local/share/com.nekotime.app/` |

**建议从设置对话框底部复制完整路径。** 首次运行新版本时，需要手动迁移主题和配置文件。

---

## 版本更新检查清单

版本号与 `CHANGELOG.md` 由 release-please 通过发版 PR 更新，无需手动改动。发布新版本时人工负责：

- [ ] 确认各平台显示名称为 `NekoTime`
- [ ] 从 `source.png` 重新生成图标
- [ ] 构建所有平台
- [ ] 测试安装包
- [ ] 核对 Release 中的 SHA256 校验和

发版流程细节见 [BUILD_GUIDE.md](BUILD_GUIDE.md#发布流程)。
