import { IThemeCssVar } from './type';
export declare const getBodyVar: (el: string, key: string) => string;
export declare const colorToRgba: (color: string, a?: number, type?: 'string' | 'array') => string | number[];
export declare const isLight: (bgColor: string) => boolean;
export declare const getCssVar: () => {
    hoverBackground: string | number[];
    hoverColor: string;
};
export declare const assignThemecustom: (customTheme: IThemeCssVar, defaultTheme: IThemeCssVar) => IThemeCssVar;
