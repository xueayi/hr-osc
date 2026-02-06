# HR-OSC

Heartrate OSC for VRChat

> 本仓库 Fork 自 [kamyu1537/hr-osc](https://github.com/kamyu1537/hr-osc)，添加了 **int 类型心率参数支持** 和 **GitHub Actions 自动编译**。

## 与原版的主要区别

| 功能 | 原版 | 本分支 |
|------|------|--------|
| OSC 参数类型 | bool + float | bool + float + **int** |
| 心率原始值参数 | ❌ | ✅ `/avatar/parameters/hr_value` |
| 自动编译 Release | ❌ | ✅ GitHub Actions (支持版本号自动同步) |

## OSC 参数详细说明

本项目向 VRChat 发送三种类型的参数，分别对应不同的使用场景：

### 1. 心率连接状态 (bool)
*   **参数路径**: `/avatar/parameters/hr_connected`
*   **来源**: 基于心率数据的更新频率。如果超过设定时间（默认 10s）未收到新数据，则判定为断开。
*   **用途**: 切换 Avatar 上的状态指示灯，或隐藏/显示心率显示板。

### 2. 心率百分比 (float)
*   **参数路径**: `/avatar/parameters/hr_percent`
*   **算法**: `当前心率 / 最大心率 (Max Heart Rate)`
*   **特点**: 归一化后的浮点数 (0.0 ~ 1.0)。
*   **用途**: 
    *   **混合树 (Blend Tree)**: 控制呼吸动画的速度、心脏跳动模型的频率、放射光的亮度等需要平滑过渡的特效。
    *   **优点**: 每一跳心率的细微变化都能反映在动画平滑度上。

### 3. 心率原始值 (int)
*   **参数路径**: `/avatar/parameters/hr_value`
*   **算法**: `原始心率值 (BPM)`
*   **特点**: 无损的整数值 (如 72, 125, 180)。
*   **用途**:
    *   **精准数字显示**: 配合带有数字字库的预制件（如衣服上的数字显示屏），直接显示准确的心率数字。
    *   **状态触发**: 根据具体数值触发特效（例如：心率 > 160 时触发“力竭”动画，心率 < 60 时触发“深度睡眠”逻辑）。
    *   **优点**: 无需计算百分比映射，精度最高，实现数字显示最简单。

## 使用方法

### 数据源设置
1.  **Stromno / Pulsoid**: 在设置中输入 Widget ID 即刻开始。
2.  **HTTP**: 支持通过 HTTP POST 发送数据：
    ```bash
    curl -X POST -d '60' http://localhost:8080
    ```

### 推荐流程
启动应用后进入 **Settings → Parameters** 配置对应的 OSC 路径，然后确保 VRChat 已开启 OSC 功能。

## 编译与发布

本项目支持 GitHub Actions 自动编译，自动从 Git Tag 获取版本号。

**发布新版流程**:
```bash
git tag v0.4.2
git push origin v0.4.2
```

支持平台：
- **Windows**: `.msi`, `.exe`
- **Linux**: `.deb`, `.AppImage`
