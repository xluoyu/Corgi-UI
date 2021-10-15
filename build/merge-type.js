const fs = require('fs')
const path = require('path')
const ora = require('ora')
const klawSync = require('klaw-sync')


const INPUT_PATH = path.resolve(__dirname, '../types')
const OUTPUT_PATH = path.resolve(__dirname, '../es')

function fsExistsSync(path) {
  try{
    fs.accessSync(path,fs.F_OK)
  }catch(e){
    return false
  }
  return true
}

/**
 * 目的： 将types下的文件拷贝到目标目录
 *
 * 从入口开始遍历每个文件
 *
 * 如果是文件夹，判断目标目录是否有该文件夹，没有则创建，有则编写入口地址，递归执行函数
 *
 * 如果是文件，则直接复制进入目标目录
 *
 * @param {string} input => 入口地址
 */
const copyFile = async (input, path = '') => {
  const inputPath = input + path
  const files = fs.readdirSync(inputPath) //读取入口目录下的所有文件

  return Promise.all(files.map(async file => {
    const inputFile = inputPath + '/' + file // 单个文件
    // 是目录的情况
    if (fs.statSync(inputFile).isDirectory()) {
      let output
      /**
        * 对于components 下的 src 做出特殊处理
        *
        * button/src/button.vue.d.ts -> button/button.d.ts
      */
      // if (path.includes('components') && file == 'src') {
      //   output = OUTPUT_PATH + path
      // } else {
      output = OUTPUT_PATH + path + '/' + file
      // }
      /**
       * 判断目标目录是否有待拷贝的文件夹
       *
       * 没有则创建
       */
      if (!fsExistsSync(output)) {
        await fs.mkdirSync(output)
      }

      return await copyFile(input, path + '/' + file)
    } else {
      let output = OUTPUT_PATH + '/' + path + '/' + file

      if (fsExistsSync(output)) {
        return Promise.resolve()
      }
      // 是文件的情况
      return fs.rename(inputFile, output, err => {
        if (err) {
          console.log(err)
          return
        }
        Promise.resolve()
      })
    }
  }))
}


// const copyFile = async input => {
//   const files = fs.readdirSync(input)

//   return Promise.all(files.map(async file => {
//     let inputFile = input + '/' + file
//     if (fs.statSync(inputFile).isDirectory()) {
//
//       if (inputFile.includes('components') && inputFile.includes('src')) {
//         let output = OUTPUT_PATH + '/' + file + '/src'
//         return fs.rename(inputFile, output, err => {
//           if (err) {
//             console.log(err)
//             return
//           }
//           Promise.resolve()
//         })
//       } else {
//         let output = OUTPUT_PATH + '/' + file
//         if (!fs.statSync(output).isDirectory()) {
//           fs.mkdir(output)
//         }
//         return await copyFile(inputFile)
//       }
//     } else {
//       let output = OUTPUT_PATH + '/'
//       if (input.includes('components')) {
//         output += 'components/' + input.split('/').pop() + '/' + file
//       } else if (input.includes('hooks')) {
//         output += 'hooks/' + input.split('/').pop() + '.' + file.split('.').slice(1).join('.')
//       } else if (input.includes('directives')) {
//         output += 'directives/' + input.split('/').pop() + '.' + file.split('.').slice(1).join('.')
//       } else if (input.includes('utils')) {
//         output += 'utils/' + file
//       } else {
//         output += file
//       }

//       return fs.rename(inputFile, output, err => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         Promise.resolve()
//       })
//     }
//   }))
// }

async function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + '/' + file
      if(fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

/**
 * 遍历types文件夹
 *
 * 删除掉除types根目录以外的.js文件
 */
function clearJS () {
  klawSync(INPUT_PATH, {
    nodir: true,
  }).map(item => item.path)
    .filter(e => /components\\\w+\\/.test(e))
    .filter(e => /\.js/.test(e))
    // .filter(e => !/types\\\w+\.js/.test(e))
    .forEach(file => {
      fs.unlinkSync(file)
    })
}

// clearJS()


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
