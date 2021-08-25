const fs = require('fs')
const path = require('path')

const INPUT_PATH = path.resolve(__dirname, '../types')
const OUTPUT_PATH = path.resolve(__dirname, "../lib")

const copyFile = async (input) => {
  const files = await fs.readdirSync(input)
  
  files.forEach(async file => {
    let inputFile = INPUT_PATH + '/' + file
    if (await fs.lstatSync(inputFile).isDirectory()) {
      copyFile(inputFile)
    } else {
      let output = OUTPUT_PATH + '/'
      if (input.includes('components')) {
        output += 'cg-' + file
      } else if (input.includes('hooks')) {
        output += 'hooks' + file
      } else if (input.includes('utils')) {
        output += 'utils' + file
      }
      fs.rename(inputFile, output, (err) => {
        err && console.log(err)
      })
    }
  })
}

copyFile(INPUT_PATH)