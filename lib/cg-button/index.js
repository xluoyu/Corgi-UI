import { createVNode, isVNode, defineComponent, inject, computed, useCssVars } from 'vue';
import { assignThemecustom, isLight } from '../utils/index';
import { isString, isFunction, isArray } from '../utils/typeTool';
import { warn } from '../utils/warn';
import cssvar from '../cg-style/index';

const buttonVar = {
  theme: cssvar.default,
  color: "#fff",
  round: "3px",
  tiny: {
    height: "22px",
    fontSize: cssvar.fontSizeH5,
    circle: "10px",
    padding: "0 6px"
  },
  small: {
    height: "28px",
    fontSize: cssvar.fontSizeH4,
    circle: "14px",
    padding: "0 10px"
  },
  medium: {
    height: "34px",
    fontSize: cssvar.fontSizeH3,
    circle: "16px",
    padding: "0 14px"
  },
  large: {
    height: "40px",
    fontSize: cssvar.fontSizeH2,
    circle: "20px",
    padding: "0 18px"
  }
};
var styleVar = Object.assign(cssvar, buttonVar);

// Copy from vite/src/client/vueJsxCompat.ts

const slice = Array.prototype.slice;

function vueJsxCompat(tag, props = null, children = null) {
  if (arguments.length > 3 || isVNode(children)) {
    children = slice.call(arguments, 2);
  }
  return createVNode(tag, props, children);
}

const props = {
  attrType: {
    type: String,
    default: "Button"
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
    default: "medium"
  },
  type: {
    type: String,
    default: "default"
  },
  tag: {
    type: String,
    default: "button"
  },
  onClick: [Function, Array]
};
const __default__ = defineComponent({
  name: "CgButton",
  props,
  setup(props2) {
    const customTheme = inject("theme", {});
    const handleClick = (e) => {
      const { onClick } = props2;
      if (onClick) {
        if (isFunction(onClick)) {
          onClick(e);
        } else if (isArray(onClick)) {
          onClick.forEach((fn) => {
            isFunction(fn) ? fn(e) : warn("button", "\u4F20\u5165\u7684onClick\u65E0\u6CD5\u6267\u884C");
          });
        } else {
          warn("button", "\u4F20\u5165\u7684onClick\u65E0\u6CD5\u6267\u884C");
        }
      }
    };
    let cssVar = computed(() => {
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar) : Object.assign({}, styleVar);
      composeVar.theme = props2.color ? props2.color : styleVar[props2.type];
      if (props2.color) {
        composeVar.color = isLight(props2.color) ? "#000" : "#fff";
      }
      return composeVar;
    });
    let buttonSizeVar = computed(() => {
      let sizeAboutVar = cssVar.value[props2.size];
      if (props2.round && isString(props2.round)) {
        sizeAboutVar.round = props2.round;
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
    return /* @__PURE__ */ vueJsxCompat(Component, {
      class: [
        `cg-button`,
        {
          "cg-button--default": this.type === "default",
          "cg-button--circle": this.circle,
          "cg-button--round": this.round,
          "cg-button--ghost": this.ghost,
          "cg-button--dashed": this.dashed,
          "cg-button--disabled": this.disabled,
          "cg-button--text": this.text
        }
      ],
      style: {
        "display": this.block ? "flex" : "inline-flex"
      },
      disabled: this.disabled,
      type: this.attrType,
      onClick: this.onClick
    }, /* @__PURE__ */ vueJsxCompat("span", null, $slots.default && $slots.default()));
  }
});
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "0b281ff0": _ctx.cssVar.theme,
    "2b757e0a": _ctx.buttonSizeVar.height,
    "6e7fe113": _ctx.buttonSizeVar.fontSize,
    "0d00acbc": _ctx.cssVar.color,
    "395e28e4": _ctx.buttonSizeVar.padding,
    "0b59a866": _ctx.cssVar.round,
    "2329a9b3": _ctx.buttonSizeVar.circle
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props2, ctx) => {
  __injectCSSVars__();
  return __setup__(props2, ctx);
} : __injectCSSVars__;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".flex-center[data-v-4c16db01] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-4c16db01] {\n  background: var(--0b281ff0);\n  height: var(--2b757e0a);\n  font-size: var(--6e7fe113);\n  color: var(--0d00acbc);\n  padding: var(--395e28e4);\n  box-sizing: border-box;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-4c16db01]:hover {\n  opacity: 0.7;\n}\n.cg-button.cg-button--round[data-v-4c16db01] {\n  border-radius: var(--0b59a866);\n}\n.cg-button.cg-button--circle[data-v-4c16db01] {\n  border-radius: var(--2329a9b3);\n}\n.cg-button.cg-button--ghost[data-v-4c16db01] {\n  background: transparent;\n  border: 1px solid var(--0b281ff0);\n  color: var(--0b281ff0);\n}\n.cg-button.cg-button--ghost[data-v-4c16db01]:hover {\n  background: var(--0b281ff0);\n  color: var(--0d00acbc);\n}\n.cg-button.cg-button--ghost.cg-button--dashed[data-v-4c16db01] {\n  border-style: dashed;\n}\n.cg-button.cg-button--disabled[data-v-4c16db01] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.cg-button.cg-button--text[data-v-4c16db01] {\n  border: none;\n  background: none;\n  color: var(--0b281ff0);\n}\n.cg-button.cg-button--default[data-v-4c16db01] {\n  border: 1px solid #eee;\n  color: #333;\n  background: #fff;\n}\n";
styleInject(css_248z);

__default__.__scopeId = "data-v-4c16db01";

__default__.install = (app) => {
  app.component(__default__.name, __default__);
};
const _Button = __default__;

export { _Button as default };
