declare var _default: import("vue").DefineComponent<{
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
    vertical: boolean;
    containerEl: Ref<HTMLElement>;
    update: () => void;
    thrumbVerticalMouseDown: (e: any) => void;
    contentEl: Ref<HTMLElement>;
    styleVar: any;
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
import { PropType } from "@vue/runtime-core";
import { Ref } from "@vue/runtime-core";
