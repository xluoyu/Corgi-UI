import { PropType, Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    y: BooleanConstructor;
    x: BooleanConstructor;
    show: {
        type: PropType<"always" | "hover" | "never">;
        default: string;
    };
    thrumbClass: StringConstructor;
    thrumbStyle: StringConstructor;
    scrollClass: StringConstructor;
    scrollStyle: StringConstructor;
    loadHeight: NumberConstructor;
    loadMore: FunctionConstructor;
}, {
    verticalEl: Ref<HTMLElement>;
    vertical: {
        el: any;
        height: number;
        thrumbHeight: number;
        thrumbY: number;
    };
    containerEl: Ref<HTMLElement>;
    update: () => void;
    thrumbVerticalMouseDown: (e: any) => void;
    contentEl: Ref<HTMLElement>;
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
    y?: unknown;
    x?: unknown;
    show?: unknown;
    thrumbClass?: unknown;
    thrumbStyle?: unknown;
    scrollClass?: unknown;
    scrollStyle?: unknown;
    loadHeight?: unknown;
    loadMore?: unknown;
} & {
    y: boolean;
    x: boolean;
    show: "always" | "hover" | "never";
} & {
    thrumbClass?: string;
    thrumbStyle?: string;
    scrollClass?: string;
    scrollStyle?: string;
    loadHeight?: number;
    loadMore?: Function;
}> & {}, {
    y: boolean;
    x: boolean;
    show: "always" | "hover" | "never";
}>;
export default _default;
