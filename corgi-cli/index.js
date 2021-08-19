const inquirer = require('inquirer')
const {resolve} = require('path')
const {createComponent} = require('./create')

const paths = {
  Component: resolve(__dirname, '../src/components')
}

const promptList = [
  {
    type: 'list',
    message: '请选择要创建的类型',
    name: 'create',
    choices: [
      "Component",
      "Hooks",
      "Directive"
    ]
  },
  {
    type: 'input',
    message: '请输入前缀',
    name: 'prefix',
    filter: (val) => val.toLowerCase()
  },
  {
    type: 'input',
    message: '请输入要创建的名称',
    name: 'name',
    filter: (val) => val.toLowerCase()
  }
]

inquirer.prompt(promptList).then(answers => {
  const rootPath = paths[answers['create']]
  answers.fileName = answers['name'].charAt(0).toUpperCase() + answers['name'].slice(1)
  answers.prefixBig = answers['prefix'].charAt(0).toUpperCase() + answers['prefix'].slice(1)
  if (answers['create'] === 'Component') {
    createComponent(rootPath, answers)
  }
})