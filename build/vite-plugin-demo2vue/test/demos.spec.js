import {getTargetFile} from '../loaders/demo-loader'

const demoPath = '../../src/components/button/demos/index.md'

const add = (a, b) => a + b

describe("test demo renderer", () => {
  test("demo-render", () => {
    const res = add(1, 2)

    console.log(res)

    expect(res).toBe(3)
  })
})