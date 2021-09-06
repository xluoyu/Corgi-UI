import type { Plugin } from 'vue';
export interface IThemeCssVar {
    [propName: string]: any;
}
export declare type SFCWithInstall<T> = T & Plugin;
