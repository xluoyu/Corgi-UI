import { defineComponent, computed, inject } from 'vue';
import { assignThemecustom, isLight } from '..\../utils/index';
import { IThemeCssVar } from '..\../utils/type';
import { isFunction, isArray, isString } from '..\../utils/typeTool';
import { warn } from '..\../utils/warn';
import styleVar from './styleVar';
const props = {
    attrType: {
        type: String,
        default: 'Button'
    },
    round: {
        type: [Boolean, String],
        default: true
    },
    text: Boolean,
    circle: Boolean,
    block: Boolean,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    ghost: Boolean,
    dashed: Boolean,
    size: {
        type: String,
        default: 'medium'
    },
    type: {
        type: String,
        default: 'default'
    },
    tag: {
        type: String,
        default: 'button'
    },
    onClick: [Function, Array]
};
export default defineComponent({
    name: 'CgButton',
    props,
    setup(props) {
        const customTheme = inject < IThemeCssVar > ('theme', {});
        const handleClick = (e) => {
            const { onClick } = props;
            if (onClick) {
                if (isFunction(onClick)) {
                    onClick(e);
                }
                else if (isArray(onClick)) {
                    onClick.forEach(fn => {
                        isFunction(fn) ? fn(e) : warn('button', '传入的onClick无法执行');
                    });
                }
                else {
                    warn('button', '传入的onClick无法执行');
                }
            }
        };
        let cssVar = computed(() => {
            let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : Object.assign({}, styleVar);
            composeVar.theme = props.color ? props.color : styleVar[props.type];
            if (props.color) {
                composeVar.color = isLight(props.color) ? '#000' : '#fff';
            }
            return composeVar;
        });
        let buttonSizeVar = computed(() => {
            let sizeAboutVar = cssVar.value[props.size];
            if (props.round && isString(props.round)) {
                sizeAboutVar.round = props.round;
            }
            return sizeAboutVar;
        });
        return {
            cssVar,
            buttonSizeVar,
            handleClick
        };
    },
    render() {
        const { $slots, tag: Component } = this;
        return (<Component class={[
                `cg-button`,
                {
                    'cg-button--default': this.type === 'default',
                    'cg-button--circle': this.circle,
                    'cg-button--round': this.round,
                    'cg-button--ghost': this.ghost,
                    'cg-button--dashed': this.dashed,
                    'cg-button--disabled': this.disabled,
                    'cg-button--text': this.text
                }
            ]} style={{
                'display': this.block ? 'flex' : 'inline-flex'
            }} disabled={this.disabled} type={this.attrType} onClick={this.onClick}>
        <span>{$slots.default && $slots.default()}</span>
      </Component>);
    }
});
