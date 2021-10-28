---
title: 位运算
date: '2021-07-23 15:47:00'
sidebar: 'auto'
categories:
 - 技术笔记
tags:
 - JS
---
# 加载条 LoadingBar

速度决定一切

<cg-alert type="warning">!!记得在项目最外层(比如：App.vue的外层)套上该组件</cg-alert>

```html
<!-- 这里是App.vue -->
<cg-loading-bar>
  <!-- 项目代码 -->
</cg-loading-bar>
```


# 示例
```demo
base
```

# Props

| 名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| activeColor | `string` |  | `#0fd130` | 加载时的颜色 |
| errorColor | `string` |  | `#d34937` | 报错时的颜色 |