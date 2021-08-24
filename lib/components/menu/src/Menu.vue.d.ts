import { PropType } from 'vue';
import { IMenuItem } from './type';
declare const __default__: import("vue").DefineComponent<{
    mode: {
        type: PropType<"vertical" | "horizontal">;
        default: string;
    };
    list: {
        type: PropType<IMenuItem[]>;
        dafault: any[];
    };
}, {
    vars: {
        colorPrimary: string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    mode?: unknown;
    list?: unknown;
} & {
    mode: "vertical" | "horizontal";
} & {
    list?: IMenuItem[];
}> & {}, {
    mode: "vertical" | "horizontal";
}>;
export default __default__;
