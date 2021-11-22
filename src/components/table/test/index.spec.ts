import run from '../src/counter'

describe('table', () => {
  test('算法检测', () => {
    const list = [
      {
        name: '北京',
      },
      {
        name: '浙江',
        children: [
          {
            name: '杭州',
            children: [
              {
                name: '余杭区',
              },
              {
                name: '西湖区',
              },
            ],
          },
          {
            name: '宁波',
          },
          {
            name: '舟山',
          },
        ],
      },
    ]

    const res = [
      [
        {
          name: '北京',
          col: 1,
          row: 3,
        },
        {
          name: '浙江',
          col: 4,
          row: 1,
        },
      ],
      [
        {
          name: '杭州',
          col: 2,
          row: 1,
        },
        {
          name: '宁波',
          col: 1,
          row: 2,
        },
        {
          name: '舟山',
          col: 1,
          row: 2,
        },
      ],
      [
        {
          name: '余杭区',
          col: 1,
          row: 1,
        },
        {
          name: '西湖区',
          col: 1,
          row: 1,
        },
      ],
    ]

    expect(run(list)).toEqual(res)
  })
})
