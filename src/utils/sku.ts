const list = [
  { label: '颜色', value: ['红色', '绿色', '蓝色'] },
  { label: '尺寸', value: ['超大', '大', '中', '小'] },
]

export const skuArr = (arr: any[]) => {
  return arr.reduce((a, b) => {
    return a.flatMap(x => {
      return b.value.map(y => {
        return {
          sku: [...x.sku, { label: b.label, value: y }],
        }
      })
    })
  }, [{ sku: [] }] ).map((e, index) => Object.assign(e, { id: index + 1 }))
}

const res = skuArr(list)



