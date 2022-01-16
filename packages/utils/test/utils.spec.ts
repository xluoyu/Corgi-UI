import { colorToRgba, isLight } from '../index'
import { skuArr } from '../sku'


describe('test utils', () => {
  // test("colorToRgba", () => {
  //   const res = colorToRgba('#f5a51a', .7)
  //   expect(res).toBe("rgba(245, 165, 26, 0.7)")
  // })

  test('colorToRgba2', () => {
    const res = colorToRgba('rgba(255,255,255)', 1, 'array')
    expect(res).toStrictEqual([255, 255, 255, 1])
  })

  test('changeBg to color', () => {
    const res = isLight('#fff')
    expect(res).not.toBeFalsy()
  })

  test('sku', () => {
    const defaultList = [
      { label: '颜色', value: ['红色', '绿色', '蓝色'] },
      { label: '尺寸', value: ['超大', '大', '中', '小'] },
    ]
    const defaultRes = [
      { id: 1, sku:[{ label: '颜色', value: '红色' }, { label: '尺寸', value: '超大' }] },
      { id: 2, sku:[{ label: '颜色', value: '红色' }, { label: '尺寸', value: '大' }] },
      { id: 3, sku:[{ label: '颜色', value: '红色' }, { label: '尺寸', value: '中' }] },
      { id: 4, sku:[{ label: '颜色', value: '红色' }, { label: '尺寸', value: '小' }] },
      { id: 5, sku:[{ label: '颜色', value: '绿色' }, { label: '尺寸', value: '超大' }] },
      { id: 6, sku:[{ label: '颜色', value: '绿色' }, { label: '尺寸', value: '大' }] },
      { id: 7, sku:[{ label: '颜色', value: '绿色' }, { label: '尺寸', value: '中' }] },
      { id: 8, sku:[{ label: '颜色', value: '绿色' }, { label: '尺寸', value: '小' }] },
      { id: 9, sku:[{ label: '颜色', value: '蓝色' }, { label: '尺寸', value: '超大' }] },
      { id: 10, sku:[{ label: '颜色', value: '蓝色' }, { label: '尺寸', value: '大' }] },
      { id: 11, sku:[{ label: '颜色', value: '蓝色' }, { label: '尺寸', value: '中' }] },
      { id: 12, sku:[{ label: '颜色', value: '蓝色' }, { label: '尺寸', value: '小' }] },
    ]
    const res = skuArr(defaultList)
    expect(res).toStrictEqual(defaultRes)
  })
})
