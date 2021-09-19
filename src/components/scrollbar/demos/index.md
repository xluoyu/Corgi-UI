# 滚动条

如果你嫌弃原生的滚动条，那么可以试试这个

```demo
base
theme
```

# Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| y | `Boolean` | `false` | 开启纵向滚动 |
| x | `Boolean` | `false` | 开启横向滚动 |
| show | `String<'always' \| 'hover' \| 'never'>` | `hover` | 滚动条的显示方式<'总是显示' \| '划过容器显示' \| '从不' >|
| thrumbClass | `String` | —— | 滚动条的className |
| thrumbStyle | `String` | —— | 滚动条的样式 |
| scrollClass | `String` | —— | 滚动容器的className |
| scrollStyle | `String` | —— | 滚动容器的样式 |
| loadHeight | `Number` | 50 | 滚动至底部触发回调的距离(px) |

# Events

| 事件名称 | 回调参数  | 说明 |
| --- | --- | --- |
| loadMore | —— | 滚动至底部时的回调 |


