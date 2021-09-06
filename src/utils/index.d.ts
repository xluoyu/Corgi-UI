import { IThemeCssVar } from './type';
/**
 * 获取某个dom节点上的css变量
 * @param el
 * @param key
 * @returns
 */
export declare const getBodyVar: (el: string, key: string) => string;
/**
 * 16进制颜色转RGBA
 * @param color 16进制颜色
 * @param a 透明度
 * @param type 返回值格式 string -> 'rgba(xxx,xxx,xxx,xx)'  array -> [xxx,xxx,xxx,xx]
 * @returns
 */
export declare const colorToRgba: (color: string, a?: number, type?: 'string' | 'array') => string | number[];
/**
 * 传入背景颜色，返回字体颜色
 * @param bgColor 16进制 或 RGB
 * @returns Boolean true -> #000 false -> #fff
 */
export declare const isLight: (bgColor: string) => boolean;
export declare const getCssVar: () => {
    hoverBackground: string | number[];
    hoverColor: string;
};
/**
 * 混合定制与默认主题
 *
 * @param customTheme
 * @param defaultTheme
 * @returns
 */
export declare const assignThemecustom: (customTheme: IThemeCssVar, defaultTheme: IThemeCssVar) => IThemeCssVar;
