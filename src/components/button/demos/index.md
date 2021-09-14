# 按钮 Button

可以触发某些操作

```demo
type
color
size
ghost
circle
disabled
icon
loading
text
iconText
```

# Props

| 名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| type | `string` | `default` \| `primary` \| `success` \| `info` \| `warning` \| `error` | `default` | 按钮主题 |
| size | `string` | `tiny` \| `small` \| `medium` \| `large` | `medium` | 按钮大小 |
| color | `string` | — | - | 自定义主题色 |
| text | `boolean` | — | `false` | 是否为文字型按钮 |
| circle | `boolean` | — | `false` | 椭圆形按钮 |
| round | `boolean`\|`string` | `boolean`\|圆角值（`8px`、`10px`...） | `true` | 自定义圆角 |
| block | `boolean` | — | `false` | 按钮是否为块级元素   |
| ghost | `boolean` | - | `false` | 按钮是否透明 |
| dashed | `boolean` | - | `false` | 按钮边框为虚线 |
| loading | `boolean` | - | `false` | 按钮是否加载中 |
| disabled | `boolean` | - | `false` | 按钮是否禁用 |

# slot
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| icon | --- | 图标 |
| default | --- | 内容 |
