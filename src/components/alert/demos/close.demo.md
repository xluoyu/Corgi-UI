# 可关闭

```html
<cg-space vertical>
  <cg-alert :show-icon="showIcon" type="success" showClose showIcon>
    <template #title>
      这里是标题
    </template>
    为你唱这首
  </cg-alert>
  <cg-alert :show-icon="showIcon" type="info" showClose>没有什么风格</cg-alert>
  <cg-alert :show-icon="showIcon" type="warning" showClose>它仅仅代表着</cg-alert>
</cg-space>
```