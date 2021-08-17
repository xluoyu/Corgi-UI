import { warn } from "./warn";

// 获取某个dom节点上的css变量
export const getBodyVar = (el:string, key:string) => {
  let bodyEl = document.querySelector(el) as HTMLElement
  return getComputedStyle(bodyEl).getPropertyValue(key);
}

/**
 * 16进制颜色转RGBA
 * @param color 16进制颜色
 * @param a 透明度
 * @param type 返回值格式 string -> 'rgba(xxx,xxx,xxx,xx)'  array -> [xxx,xxx,xxx,xx]
 * @returns 
 */
export const colorToRgba = (color: string, a?: number, type: 'string' | 'array' = 'string'):string | number[] => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  color = color.toLocaleLowerCase()

  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    if (type === 'string') {
      return "rgba(" + colorChange.join(", ") + (a ? ', ' + a : '') +")";
    } else {
      return colorChange.join(", ")
    }
  } else {
    if (type === 'string') {
      return color;
    } else {
      let res = color.match(/(\d(\.\d+)?)+/g) || [] as number[]
      if (!res.length) {
        warn('colorToRgba', `传入的${color}未找到数值`)
        return []
      }
      res = res.map(Number)
      a && res.push(a)
      return res;
    }
  }
}

export const isLight = (bgColor: string) => {
  let rgbArr = colorToRgba(bgColor, 1, 'array') as number[]
  return (0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255/2)
}

export const getCssVar = () => {
  let colorPrimary = getBodyVar('body', '--color-primary')

  return {
    hoverBackground: colorToRgba(colorPrimary, .7),
    hoverColor: isLight(colorPrimary) ? '#000' : '#fff'
  }
}