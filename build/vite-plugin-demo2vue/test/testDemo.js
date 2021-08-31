const demoLoader = require('../loaders/demo-loader')
const fs = require('fs')

const code = fs.readFileSync('../../src/components/button/demos/color.demo.md', 'utf-8')

demoLoader(code)
