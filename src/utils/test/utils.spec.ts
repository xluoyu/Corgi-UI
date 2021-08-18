import {colorToRgba, isLight} from '../index'

describe("test utils", () => {
  // test("colorToRgba", () => {
  //   const res = colorToRgba('#f5a51a', .7)
  //   expect(res).toBe("rgba(245, 165, 26, 0.7)")
  // })

  test("colorToRgba2", () => {
    const res = colorToRgba('rgba(255,255,255)', 1, 'array')
    expect(res).toStrictEqual([255, 255, 255, 1])
  })

  test('changeBg to color', () => {
    const res = isLight('#fff')
    expect(res).not.toBeFalsy()
  })
})