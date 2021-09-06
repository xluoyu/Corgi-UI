import { isObject } from './typeTool';
import { warn } from './warn';
export const getBodyVar = (el, key) => {
    const bodyEl = document.querySelector(el);
    return getComputedStyle(bodyEl).getPropertyValue(key);
};
export const colorToRgba = (color, a, type = 'string') => {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    color = color.toLocaleLowerCase();
    if (reg.test(color)) {
        if (color.length === 4) {
            let colorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        const colorChange = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
        }
        if (type === 'string') {
            return 'rgba(' + colorChange.join(', ') + (a ? ', ' + a : '') + ')';
        }
        else {
            return colorChange;
        }
    }
    else {
        if (type === 'string') {
            return color;
        }
        else {
            let res = color.match(/(\d(\.\d+)?)+/g) || [];
            if (!res.length) {
                warn('colorToRgba', `传入的${color}未找到数值`);
                return [];
            }
            res = res.map(Number);
            a && res.push(a);
            return res;
        }
    }
};
export const isLight = (bgColor) => {
    const rgbArr = colorToRgba(bgColor, 1, 'array');
    return (0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2);
};
export const getCssVar = () => {
    const colorPrimary = getBodyVar('body', '--color-primary');
    return {
        hoverBackground: colorToRgba(colorPrimary, .7),
        hoverColor: isLight(colorPrimary) ? '#000' : '#fff',
    };
};
export const assignThemecustom = (customTheme, defaultTheme) => {
    const newTheme = Object.assign({}, defaultTheme);
    Object.keys(customTheme).forEach(key => {
        if (isObject(customTheme[key]) && newTheme[key] && isObject(newTheme[key])) {
            newTheme[key] = Object.assign({}, newTheme[key], customTheme[key]);
        }
        else if (newTheme[key]) {
            newTheme[key] = customTheme[key];
        }
    });
    return newTheme;
};
