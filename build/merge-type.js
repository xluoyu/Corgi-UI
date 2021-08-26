const fs = require('fs')
const path = require('path')
const ora = require('ora')
const klawSync = require('klaw-sync')


const INPUT_PATH = path.resolve(__dirname, '../types')
const OUTPUT_PATH = path.resolve(__dirname, "../es")

const filePaths = klawSync(INPUT_PATH, {
  nodir: true,
}).map(item => item.path)
  .filter(e => !/\.js/.test(e))


const copyFile = async (input) => {
  const files = fs.readdirSync(input)
  
  return Promise.all(files.map(async file => {
    let inputFile = input + '/' + file
    if (fs.statSync(inputFile).isDirectory()) {
      if (inputFile.includes('src')) {
        let names = input.split('/')
        let output = OUTPUT_PATH + '/cg-' + names[names.length - 1] + '/src'
        return fs.rename(inputFile, output, (err) => {
          if (err) {
            console.log(err)
            return
          }
          Promise.resolve()
        })
      } else {
        return await copyFile(inputFile)
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

      return fs.rename(inputFile, output, (err) => {
        if (err) {
          console.log(err)
          return
        }
        Promise.resolve()
      })
    }
  }))
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

/**
 * 遍历types文件夹
 * 
 * 删除掉除types根目录以外的.js文件
 */
function clearJS () {
  klawSync(INPUT_PATH, {
    nodir: true,
  }).map(item => item.path)
    .filter(e => /\.js/.test(e))
    .filter(e => !/types\\\w+\.js/.test(e))
    .forEach(file => {
      fs.unlinkSync(file)
    })
}


const stats = () => {
  clearJS()
  return copyFile(INPUT_PATH).then(() => {
    console.log('复制文件完成')
    setTimeout(() => {
      deleteFolderRecursive(INPUT_PATH)
      console.log('移除临时文件夹完成')
    }, 500)
  }).catch(err => console.log(err))
}



const spinner = ora('开始整合...\n').start()

stats()
  .then(() => spinner.succeed('Success !\n'))
  .catch(e => spinner.fail(`${e} !\n`))
