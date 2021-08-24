import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
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
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
