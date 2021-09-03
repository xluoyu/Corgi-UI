const demoLoader = require('../loaders/doc-loader')
const fs = require('fs')

const code = fs.readFileSync('./test.md', 'utf-8')

demoLoader(code)

