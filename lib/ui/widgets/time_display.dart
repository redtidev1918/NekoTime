import 'package:neko_time/ui/widgets/digit_gif_v2.dart';
import 'package:flutter/material.dart';

class TimeDisplay extends StatelessWidget {
  final List<String> digits;
  final double scale;
  final double digitSpacing;
  final String? fontFamily;
  final String? gifBasePath;
  final String? imageFormat;
  final String? assetsBasePath;
  final double? digitAspectRatio;
  final double? digitBaseHeight;

  const TimeDisplay({
    super.key,
    required this.digits,
    this.scale = 1.0,
    this.digitSpacing = 0.0,
    this.fontFamily,
    this.gifBasePath,
    this.imageFormat,
    this.assetsBasePath,
    this.digitAspectRatio,
    this.digitBaseHeight,
  });

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[];
    for (int i = 0; i < digits.length; i++) {
      // 只在非第一个元素且非冒号后添加间距
      if (i > 0 &&
          digitSpacing > 0 &&
          digits[i - 1] != ':' &&
          digits[i] != ':') {
        children.add(SizedBox(key: ValueKey('spacer_$i'), width: digitSpacing));
      }
      children.add(
        DigitGifV2(
          // 槽位级稳定 key：秒位每秒变化时复用 State（didUpdateWidget 内联
          // 完成资源检查与图像切换），避免每秒销毁重建 State 触发两次构建
          // 与 GIF 动画重启——这是桌面端卡顿的主要来源之一。
          key: ValueKey('digit_slot_$i'),
          digit: digits[i],
          scale: scale,
          fontFamily: fontFamily,
          gifBasePath: gifBasePath,
          imageFormat: imageFormat,
          assetsBasePath: assetsBasePath,
          digitAspectRatio: digitAspectRatio,
          digitBaseHeight: digitBaseHeight,
        ),
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: children,
    );
  }
}
