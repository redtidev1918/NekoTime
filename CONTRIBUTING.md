# 贡献指南 / Contributing

欢迎提交 Issue 和 Pull Request！任何形式的贡献都受欢迎——修 Bug、加功能、改进主题、完善文档。

## 开发环境

- Flutter 3.27（与 CI 一致；`pubspec.yaml` 要求 Dart SDK >= 3.0）
- 目标平台工具链：macOS（Xcode）、Windows（Visual Studio C++）、Linux（GTK3 依赖，见
  [BUILD_GUIDE.md](BUILD_GUIDE.md)）

## 开发流程

1. Fork 本仓库，从 `main` 开分支；
2. `make get` 安装依赖；
3. 改动后运行质量门：
   ```bash
   make test          # 全量测试 + 静态分析 + 格式检查
   make test-quick    # 开发时快速测试
   ```
4. 提交前运行 `make pre-release`；
5. 发 PR 说明「改了什么、为什么」。

## 规范

- 遵循 Flutter 官方代码风格；
- 用户可见文案：中英双语（`lib/l10n/`）；
- 主题系统改动需同步 [themes/THEME_GUIDE.md](themes/THEME_GUIDE.md)；
- 重大功能先开 Issue 讨论，避免大而杂的 PR；
- 安全漏洞请走 [SECURITY.md](SECURITY.md)，不要公开提交。

## 发布

- 版本号在 `pubspec.yaml`，遵循语义化版本；
- 每个版本更新 [CHANGELOG.md](CHANGELOG.md)；
- 打 `v*` 标签触发 CI 三平台构建与 Release（见 `.github/workflows/build-all-platforms.yml`）。
