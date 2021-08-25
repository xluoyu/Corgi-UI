const fs = require('fs')
const path = require('path')
const ora = require('ora')

const INPUT_PATH = path.resolve(__dirname, '../types')
const OUTPUT_PATH = path.resolve(__dirname, "../lib")

const copyFile = async (input) => {
  const files = await fs.readdirSync(input)
  
  await files.forEach(async file => {
    let inputFile = input + '/' + file
    if (fs.statSync(inputFile).isDirectory()) {
      if (inputFile.includes('src')) {
        let names = input.split('/')
        let output = OUTPUT_PATH + '/cg-' + names[names.length - 1] + '/src'
        await fs.renameSync(inputFile, output)
      } else {
        await copyFile(inputFile)
      }
    } else {
      let output = OUTPUT_PATH + '/'
      if (input.includes('components')) {
        output += 'cg-' + input.split('/').pop() + '/' + file
      } else if (input.includes('hooks')) {
        output += 'hooks/' + input.split('/').pop() + '.' + file.split('.').slice(1).join('.')
      } else if (input.includes('utils')) {
        output += 'utils/' + file
      } else {
        output += file
      }
      await fs.renameSync(inputFile, output)
    }
  })
}

async function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteFolderRecursive(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
  }
};

const stats = () => {
  return copyFile(INPUT_PATH).then(() => {
    console.log('复制文件完成')
    return deleteFolderRecursive(INPUT_PATH)
  }).then(() => {
    console.log('移除临时文件夹完成')
  }).catch(err => console.log(err))
}



const spinner = ora('开始整合lib...\n').start()

stats()
  .then(() => spinner.succeed('Success !\n'))
  .catch(e => spinner.fail(`${e} !\n`))
