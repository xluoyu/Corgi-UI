declare var _default: import("vue").DefineComponent<{
    mode: {
        type: PropType<"horizontal" | "vertical">;
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
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    mode?: unknown;
    list?: unknown;
} & {
    mode: "horizontal" | "vertical";
} & {
    list?: IMenuItem[];
}> & {}, {
    mode: "horizontal" | "vertical";
}>;
export default _default;
import { PropType } from "@vue/runtime-core";
import { IMenuItem } from "./type";
