declare const _default: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}> & ({} | {}), {}>;
export default _default;
declare const _default_1: import("vue").DefineComponent<{
    modelValue: StringConstructor;
}, {
    props: Readonly<{
        "onUpdate:modelValue": (...args: any[]) => any;
        modelValue: string;
    }>;
    emit: (event: "update:modelValue", ...args: any[]) => void;
    input: import("vue").WritableComputedRef<string>;
    getCode: () => void;
    ElInput: import("element-plus/es/utils/types").SFCWithInstall<import("vue").DefineComponent<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import("vue").PropType<import("element-plus/es/utils/types").ComponentSize>;
            validator: (val: string) => boolean;
        };
        resize: {
            type: import("vue").PropType<"none" | "both" | "horizontal" | "vertical">;
            validator: (val: string) => boolean;
        };
        autosize: {
            type: import("vue").PropType<boolean | {
                minRows?: number;
                maxRows?: number;
            }>;
            default: boolean | {
                minRows?: number;
                maxRows?: number;
            };
        };
        autocomplete: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
        };
        form: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPassword: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWordLimit: {
            type: BooleanConstructor;
            default: boolean;
        };
        suffixIcon: {
            type: StringConstructor;
            default: string;
        };
        prefixIcon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
        };
        tabindex: {
            type: (StringConstructor | NumberConstructor)[];
        };
        validateEvent: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        maxlength: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }, {
        input: any;
        textarea: any;
        attrs: import("vue").Ref<{}>;
        inputSize: import("vue").ComputedRef<any>;
        validateState: import("vue").ComputedRef<string>;
        validateIcon: import("vue").ComputedRef<any>;
        computedTextareaStyle: import("vue").ComputedRef<{
            resize: "none" | "both" | "horizontal" | "vertical";
        }>;
        resizeTextarea: () => void;
        inputDisabled: import("vue").ComputedRef<boolean>;
        showClear: import("vue").ComputedRef<boolean>;
        showPwdVisible: import("vue").ComputedRef<boolean>;
        isWordLimitVisible: import("vue").ComputedRef<boolean>;
        textLength: import("vue").ComputedRef<number>;
        hovering: import("vue").Ref<boolean>;
        inputExceed: import("vue").ComputedRef<boolean>;
        passwordVisible: import("vue").Ref<boolean>;
        inputOrTextarea: import("vue").ComputedRef<any>;
        handleInput: (event: any) => void;
        handleChange: (event: any) => void;
        handleFocus: (event: any) => void;
        handleBlur: (event: any) => void;
        handleCompositionStart: () => void;
        handleCompositionUpdate: (event: any) => void;
        handleCompositionEnd: (event: any) => void;
        handlePasswordVisible: () => void;
        clear: () => void;
        select: () => void;
        focus: () => void;
        blur: () => void;
        getSuffixVisible: () => string | boolean | import("vue").Slot;
        onMouseLeave: (e: any) => void;
        onMouseEnter: (e: any) => void;
        handleKeydown: (e: any) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "blur" | "focus" | "input" | "keydown" | "mouseenter" | "mouseleave" | "clear")[], "update:modelValue" | "change" | "blur" | "focus" | "input" | "keydown" | "mouseenter" | "mouseleave" | "clear", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        modelValue?: unknown;
        type?: unknown;
        size?: unknown;
        resize?: unknown;
        autosize?: unknown;
        autocomplete?: unknown;
        placeholder?: unknown;
        form?: unknown;
        disabled?: unknown;
        readonly?: unknown;
        clearable?: unknown;
        showPassword?: unknown;
        showWordLimit?: unknown;
        suffixIcon?: unknown;
        prefixIcon?: unknown;
        label?: unknown;
        tabindex?: unknown;
        validateEvent?: unknown;
        inputStyle?: unknown;
        maxlength?: unknown;
    } & {
        form: string;
        type: string;
        disabled: boolean;
        modelValue: string | number;
        autosize: boolean | {
            minRows?: number;
            maxRows?: number;
        };
        autocomplete: string;
        readonly: boolean;
        clearable: boolean;
        showPassword: boolean;
        showWordLimit: boolean;
        suffixIcon: string;
        prefixIcon: string;
        validateEvent: boolean;
        inputStyle: Record<string, any>;
    } & {
        resize?: "none" | "both" | "horizontal" | "vertical";
        label?: string;
        size?: import("element-plus/es/utils/types").ComponentSize;
        placeholder?: string;
        tabindex?: string | number;
        maxlength?: string | number;
    }> & {
        onChange?: (...args: any[]) => any;
        "onUpdate:modelValue"?: (...args: any[]) => any;
        onMouseenter?: (...args: any[]) => any;
        onMouseleave?: (...args: any[]) => any;
        onFocus?: (...args: any[]) => any;
        onBlur?: (...args: any[]) => any;
        onClear?: (...args: any[]) => any;
        onInput?: (...args: any[]) => any;
        onKeydown?: (...args: any[]) => any;
    }, {
        form: string;
        type: string;
        disabled: boolean;
        modelValue: string | number;
        autosize: boolean | {
            minRows?: number;
            maxRows?: number;
        };
        autocomplete: string;
        readonly: boolean;
        clearable: boolean;
        showPassword: boolean;
        showWordLimit: boolean;
        suffixIcon: string;
        prefixIcon: string;
        validateEvent: boolean;
        inputStyle: Record<string, any>;
    }>>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {} & {
    modelValue?: string;
}> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {}>;
export default _default_1;
