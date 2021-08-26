declare var _default: import("vue").DefineComponent<{
    align: {
        type: PropType<"start" | "end" | "center">;
        default: string;
    };
    inline: BooleanConstructor;
    wrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    styleVar: any;
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    align?: unknown;
    inline?: unknown;
    wrap?: unknown;
} & {
    align: "start" | "end" | "center";
    inline: boolean;
    wrap: boolean;
} & {}> & {}, {
    align: "start" | "end" | "center";
    inline: boolean;
    wrap: boolean;
}>;
export default _default;
import { PropType } from "@vue/runtime-core";
