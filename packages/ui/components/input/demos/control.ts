export default {
  name: 'CgInput',
  props: [
    {
      key: 'type',
      value: 'text',
      type: 'select',
      options: ['text', 'number', 'textarea', 'password'],
      label: '类型',
    },
    {
      key: 'placeholder',
      value: ' ',
      type: 'text',
      label: '提示字段',
    },
  ],
}
