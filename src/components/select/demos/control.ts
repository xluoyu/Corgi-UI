export default {
  name: 'CgSelect',
  vmodel: 'text',
  props: [
    {
      key: 'options',
      value: "['text', 'number', 'textarea', 'password']",
      type: 'code',
      codeType: 'js',
      label: '类型',
    },
  ],
}
