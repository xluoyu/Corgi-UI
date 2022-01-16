const inquirer = require('inquirer')
const { resolve } = require('path')
const { createComponent, createDirective } = require('./create')

const paths = {
  Component: resolve(__dirname, '../src/components'),
  Directive: resolve(__dirname, '../src/directives'),
}

const promptList = [
  {
    type: 'list',
    message: '请选择要创建的类型',
    name: 'create',
    choices: [
      'Component',
      'Hooks',
      'Directive',
    ],
  },
  {
    type: 'input',
    message: '请输入要创建的名称',
    name: 'name',
  },
]

inquirer.prompt(promptList).then(answers => {
  const rootPath = paths[answers['create']]
  answers.fileName = answers['name'].charAt(0).toUpperCase() + answers['name'].slice(1)
  if (answers['create'] === 'Component') {
    createComponent(rootPath, answers)
  }
  if (answers['create'] === 'Directive') {
    createDirective(rootPath, answers)
  }

  console.log('创建成功')
})
