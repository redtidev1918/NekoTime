## 主题系统

### 主题目录位置

主题存储在应用支持目录的 `themes/` 文件夹。建议从设置对话框底部复制完整路径。

| 平台 | 路径 |
|------|------|
| **macOS (Sandbox)** | `~/Library/Containers/com.nekotime.app/Data/Library/Application Support/com.nekotime.app/themes/` |
| **macOS (非 Sandbox)** | `~/Library/Application Support/NekoTime/themes/` |
| **Windows** | `%APPDATA%\com.nekotime.app\themes\` |
| **Linux** | `~/.local/share/com.nekotime.app/themes/` |

从 DMG 或 App Store 安装的 macOS 版本使用 Sandbox 模式，路径较长。

### 创建主题

#### 1. 目录结构

```
themes/
└── my_awesome_theme/          # 主题文件夹（ID）
    ├── theme.json             # 主题配置（必需）
    ├── digits/                # 数字图片文件夹
    │   ├── 0.gif
    │   ├── 1.gif
    │   ├── ...
    │   └── 9.gif
    └── assets/                # 其他资源（可选）
        ├── background.jpg
        ├── overlay.png
        └── CustomFont.ttf
```

#### 2. 配置示例 (`theme.json`)

```json
{
  "id": "my_awesome_theme",
  "name": "My Awesome Theme",
  "version": "1.0.0",
  "apiVersion": 1,
  "kind": "blur",
  "borderRadius": 12,
  "padding": {
    "preset": "compact"
  },
  "layout": {
    "alignment": "center"
  },
  "backgroundColor": "#202020",
  "backgroundOpacityMultiplier": 0.5,
  "tintColor": "#9E9E9E",
  "tintOpacityMultiplier": 0.15,
  "blur": {
    "sigmaX": 16,
    "sigmaY": 16
  },
  "digit": {
    "spacing": 2,
    "gifPath": "digits",
    "format": "gif"
  }
}
```

#### 3. 配置字段说明

**基础信息**
- `id` - 主题唯一标识符（建议与文件夹名一致）
- `name` - 显示名称
- `version` - 主题版本号
- `apiVersion` - API 版本（当前为 1）

**外观样式**
- `kind` - 主题类型：`transparent` | `blur` | `solid`
- `borderRadius` - 边框圆角半径（像素）
- `backgroundColor` - 背景颜色（十六进制）
- `backgroundOpacityMultiplier` - 背景不透明度系数（0.0-1.0）
- `tintColor` - 着色颜色
- `tintOpacityMultiplier` - 着色不透明度系数

**布局配置**
- `padding.preset` - 内边距预设：`none` | `compact` | `cozy` | `comfortable`
- `padding.horizontal/vertical` - 自定义水平/垂直内边距
- `layout.alignment` - 对齐方式：`left` | `center` | `right`

**数字显示**
- `digit.spacing` - 数字间距（像素）
  - 推荐值：紧凑 `0-2` / 标准 `4-8` / 宽松 `10-16`
- `digit.gifPath` - 数字图片文件夹路径（相对主题根目录）
- `digit.format` - 图片格式：`gif` | `png` | `jpg` | `webp` | `bmp`
  - 留空则自动检测

**高级选项**
- `blur.sigmaX/sigmaY` - 模糊程度（仅 `kind: blur` 生效）
- `backgroundImage` - 背景图路径（相对主题根目录）
- `overlayImage` - 前景叠加图路径
- `fontFamily` - 自定义字体族名
- `fonts` - 字体文件路径数组（TTF/OTF）

### 快速配置模板

**极简紧凑**
```json
{
  "borderRadius": 12,
  "padding": { "preset": "compact" },
  "digit": { "spacing": 0 }
}
```

**毛玻璃效果**
```json
{
  "kind": "blur",
  "blur": { "sigmaX": 16, "sigmaY": 16 },
  "tintOpacityMultiplier": 0.15
}
```

### 应用主题

1. 将主题文件夹复制到 `themes/` 目录
2. 打开托盘菜单 → 点击 **"Reload Themes"**
3. 托盘菜单 → **Theme** → 选择你的主题

详细主题开发指南见 [themes/THEME_GUIDE.md](themes/THEME_GUIDE.md)。

