import { PropType } from 'vue';
import { IMenuItem } from './type';
declare const __default__: import("vue").DefineComponent<{
    item: {
        type: PropType<IMenuItem>;
        required: true;
    };
}, {
    styleVar: {
        primary: string;
        success: string;
        info: string;
        warning: string;
        error: string;
        default: string;
        fontSizeH1: string;
        fontSizeH2: string;
        fontSizeH3: string;
        fontSizeH4: string;
        fontSizeH5: string;
        pMargin: string;
    } & {
        theme: string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    item?: unknown;
} & {
    item: IMenuItem;
} & {}> & {}, {}>;
export default __default__;
