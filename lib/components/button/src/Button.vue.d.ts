import { PropType } from 'vue';
import { IThemeCssVar } from '../../../utils/type';
declare const __default__: import("vue").DefineComponent<{
    attrType: {
        type: StringConstructor;
        default: string;
    };
    round: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    text: BooleanConstructor;
    circle: BooleanConstructor;
    block: BooleanConstructor;
    color: StringConstructor;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    ghost: BooleanConstructor;
    dashed: BooleanConstructor;
    size: {
        type: PropType<"tiny" | "small" | "medium" | "large">;
        default: string;
    };
    type: {
        type: PropType<"default" | "primary" | "success" | "info" | "warning" | "error">;
        default: string;
    };
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: string;
    };
    onClick: (FunctionConstructor | ArrayConstructor)[];
}, {
    cssVar: import("vue").ComputedRef<IThemeCssVar>;
    buttonSizeVar: import("vue").ComputedRef<any>;
    handleClick: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    attrType?: unknown;
    round?: unknown;
    text?: unknown;
    circle?: unknown;
    block?: unknown;
    color?: unknown;
    loading?: unknown;
    disabled?: unknown;
    ghost?: unknown;
    dashed?: unknown;
    size?: unknown;
    type?: unknown;
    tag?: unknown;
    onClick?: unknown;
} & {
    attrType: string;
    round: string | boolean;
    text: boolean;
    circle: boolean;
    block: boolean;
    loading: boolean;
    disabled: boolean;
    ghost: boolean;
    dashed: boolean;
    size: "tiny" | "small" | "medium" | "large";
    type: "default" | "primary" | "success" | "info" | "warning" | "error";
    tag: keyof HTMLElementTagNameMap;
} & {
    color?: string;
    onClick?: Function | unknown[];
}> & {}, {
    attrType: string;
    round: string | boolean;
    text: boolean;
    circle: boolean;
    block: boolean;
    loading: boolean;
    disabled: boolean;
    ghost: boolean;
    dashed: boolean;
    size: "tiny" | "small" | "medium" | "large";
    type: "default" | "primary" | "success" | "info" | "warning" | "error";
    tag: keyof HTMLElementTagNameMap;
}>;
export default __default__;
