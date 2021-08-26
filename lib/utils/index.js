const isObject = (val) => typeof val === "object";

function warn(location, message) {
  console.error(`[Corgi/${location}]: ${message}`);
}

const getBodyVar = (el, key) => {
  let bodyEl = document.querySelector(el);
  return getComputedStyle(bodyEl).getPropertyValue(key);
};
const colorToRgba = (color, a, type = "string") => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  color = color.toLocaleLowerCase();
  if (reg.test(color)) {
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    if (type === "string") {
      return "rgba(" + colorChange.join(", ") + (a ? ", " + a : "") + ")";
    } else {
      return colorChange;
    }
  } else {
    if (type === "string") {
      return color;
    } else {
      let res = color.match(/(\d(\.\d+)?)+/g) || [];
      if (!res.length) {
        warn("colorToRgba", `\u4F20\u5165\u7684${color}\u672A\u627E\u5230\u6570\u503C`);
        return [];
      }
      res = res.map(Number);
      a && res.push(a);
      return res;
    }
  }
};
const isLight = (bgColor) => {
  let rgbArr = colorToRgba(bgColor, 1, "array");
  return 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;
};
const getCssVar = () => {
  let colorPrimary = getBodyVar("body", "--color-primary");
  return {
    hoverBackground: colorToRgba(colorPrimary, 0.7),
    hoverColor: isLight(colorPrimary) ? "#000" : "#fff"
  };
};
const assignThemecustom = (customTheme, defaultTheme) => {
  let newTheme = Object.assign({}, defaultTheme);
  Object.keys(customTheme).forEach((key) => {
    if (isObject(customTheme[key]) && newTheme[key] && isObject(newTheme[key])) {
      newTheme[key] = Object.assign({}, newTheme[key], customTheme[key]);
    } else if (newTheme[key]) {
      newTheme[key] = customTheme[key];
    }
  });
  return newTheme;
};

export { assignThemecustom, colorToRgba, getBodyVar, getCssVar, isLight };
