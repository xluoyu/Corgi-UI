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
      value: '<h3>哈哈哈</h3>',
      label: '内容',
    },
  ],
}
