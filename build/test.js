const {alias} = require('./config')

const url = '@hooks/useToggle'

function changeUrl(alias, url) {
  let aliasKeys = Object.keys(alias)
  let curAliasKey = aliasKeys.find(e => url.includes(e))
  if (curAliasKey) {
    return alias[curAliasKey] + url.slice(curAliasKey.length)
  }
}


console.log(changeUrl(alias, url))