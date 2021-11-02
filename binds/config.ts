import { h } from 'vue'

export default {
  name: 'cg-alert',
  options: {
    title: {
      value: '这里是标题',
      type: 'text',
      label: '标题',
    },
    content: {
      value: '<h3>哈哈哈</h3>',
      type: 'slot',
      slot: 'default',
      label: '内容',
    },
    type: {
      value: 'success',
      type: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
      label: '类型',
    },
    showIcon: {
      value: true,
      type: 'switch',
      label: '开启图标',
    },
    showClose: {
      value: true,
      type: 'switch',
      label: '关闭按钮',
    },
  },
}
