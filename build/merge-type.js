const fs = require('fs')
const path = require('path')

const INPUT_PATH = path.resolve(__dirname, '../types')
const OUTPUT_PATH = path.resolve(__dirname, "../lib")

const copyFile = async (input) => {
  const files = await fs.readdirSync(input)
  
  files.forEach(async file => {
    let inputFile = input + '/' + file
    console.log(input)
    if (await fs.lstatSync(inputFile).isDirectory()) {
      if (inputFile.includes('src')) {
        let names = input.split('/')
        let output = OUTPUT_PATH + '/cg-' + names[names.length - 2] + '/src'
        fs.rename(inputFile, output, (err) => {
          err && console.log(err)
        })
      } else {
        copyFile(inputFile)
      }
    } else {
      let output = OUTPUT_PATH + '/'
      if (input.includes('components')) {
        output += 'cg-' + input.split('/').pop() + '/' + file
        return
      } else if (input.includes('hooks')) {
        output += 'hooks/' + input.split('/').pop() + '.' + file.split('.').slice(1).join('.')
      } else if (input.includes('utils')) {
        output += 'utils/' + file
      }
      fs.rename(inputFile, output, (err) => {
        err && console.log(err)
      })
    }
  })
}

copyFile(INPUT_PATH)