export default {
  name: 'CgButton',
  props: [
    {
      key: 'type',
      value: 'primary',
      type: 'select',
      options: ['primary', 'default', 'success', 'info', 'warning', 'error'],
      label: '类型',
    },
    {
      key: 'size',
      value: 'medium',
      type: 'select',
      label: '大小',
      options: ['mini', 'small', 'medium', 'large'],
    },
    {
      key: 'circle',
      value: false,
      type: 'switch',
      label: '椭圆形',
    },
    {
      key: 'ghost',
      value: false,
      type: 'switch',
      label: '透明模式',
    },
    {
      key: 'loading',
      value: false,
      type: 'switch',
      label: '加载中',
    },
    {
      key: 'disabled',
      value: false,
      type: 'switch',
      label: '禁用',
    },
  ],
  slots: [
    {
      key: 'default',
      value: `这是一个按钮`,
      label: '内容',
    },
    {
      key: 'icon',
      value: `<cg-icon>
  <Apple />
</cg-icon>`,
      label: '图标',
    },
  ],
  events: [
    {
      key: 'click',
      value: `() => {
  alert('你点击了')
}`,
      label: '点击事件',
    },
  ],
}
