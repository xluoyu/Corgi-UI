export default {
  name: 'CgAlert',
  props: [
    {
      key: 'title',
      value: '这里是标题',
      type: 'text',
      label: '标题',
    },
    {
      key: 'type',
      value: 'success',
      type: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
      label: '类型',
    },
    {
      key: 'showIcon',
      value: true,
      type: 'switch',
      label: '开启图标',
    },
    {
      key: 'showClose',
      value: true,
      type: 'switch',
      label: '关闭按钮',
    },
  ],
  slots: [
    {
      key: 'default',
      value: '<div><cg-button type="success">哈哈哈哈</cg-button><h3>哈哈哈</h3></div>',
      label: '内容',
    },
  ],
  events: [
    {
      key: 'close',
      value: '() => {alert("关闭了")}',
      label: '关闭事件',
    },
  ],
}
