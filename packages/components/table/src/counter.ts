interface IList {
  name: String
  children?: IList[]
}

export default (l: IList[]) => {
  let maxRow = 1
  const res = []

  function runList(list: IList[], i) {
    list.forEach(item => {
      let col = 1
      if (item.children) {
        col = runList(item.children, i + 1)
        maxRow += 1
      }
      if (!res[i]) res[i] = []
      res[i].push({ name: item.name })
    })
  }

  runList(l, 0)

  return res
}
