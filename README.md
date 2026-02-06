# HR-OSC

Heartrate OSC for VRChat

为了解决apple watch不能直接通过蓝牙发送心率广播的问题，所以参考了[PCBLEtoVRC](https://github.com/SinkStarUR/PCBLEtoVRC)的实现方式，对原版hr-osc进行了修改。


## 与原版的主要区别

| 功能 | 原版 | 本分支 |
|------|------|--------|
| OSC 参数类型 | bool + float | bool + float + **int** |
| 心率原始值参数 | ❌ | ✅ `/avatar/parameters/hr_value` |
| 自动编译 Release | ❌ | ✅ GitHub Actions |

## Download

[Release](https://github.com/xueayi/hr-osc/releases)

## OSC 参数说明

| 参数路径 | 类型 | 说明 |
|----------|------|------|
| `/avatar/parameters/hr_connected` | bool | 心率设备连接状态 |
| `/avatar/parameters/hr_percent` | float | 心率百分比 (0.0 ~ 1.0) |
| `/avatar/parameters/hr_value` | int | 心率原始值 (如 80) |

## Usage

### VRChat

- [Notion](https://savory-advantage-23c.notion.site/OSC-HeartRate-in-Avatar-3-0-5a61198e60054852be904d165b3791ea)

### Stromno or Pulsoid

- [Arcalive](https://arca.live/b/vrchat/48279885)

### HTTP

```bash
curl -X POST -d '60' http://localhost:8080
```

## 编译与发布

本项目使用 GitHub Actions 自动编译，通过推送 tag 触发：

```bash
git tag v0.4.1
git push origin v0.4.1
```

支持平台：
- **Windows**: `.msi`, `.exe`
- **Linux**: `.deb`, `.AppImage`
