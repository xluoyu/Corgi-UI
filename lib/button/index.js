import { defineComponent, inject, computed, useCssVars } from 'vue';

const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isObject = (val) => typeof val === "object";
const isString = (val) => typeof val === "string";

function warn(location, message) {
  console.error(`[Corgi/${location}]: ${message}`);
}

const colorToRgba = (color, a, type = "string") => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  color = color.toLocaleLowerCase();
  if (reg.test(color)) {
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    if (type === "string") {
      return "rgba(" + colorChange.join(", ") + (a ? ", " + a : "") + ")";
    } else {
      return colorChange;
    }
  } else {
    if (type === "string") {
      return color;
    } else {
      let res = color.match(/(\d(\.\d+)?)+/g) || [];
      if (!res.length) {
        warn("colorToRgba", `\u4F20\u5165\u7684${color}\u672A\u627E\u5230\u6570\u503C`);
        return [];
      }
      res = res.map(Number);
      a && res.push(a);
      return res;
    }
  }
};
const isLight = (bgColor) => {
  let rgbArr = colorToRgba(bgColor, 1, "array");
  return 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;
};
const assignThemecustom = (customTheme, defaultTheme) => {
  let newTheme = Object.assign({}, defaultTheme);
  Object.keys(customTheme).forEach((key) => {
    if (isObject(customTheme[key]) && newTheme[key] && isObject(newTheme[key])) {
      newTheme[key] = Object.assign({}, newTheme[key], customTheme[key]);
    } else if (newTheme[key]) {
      newTheme[key] = customTheme[key];
    }
  });
  return newTheme;
};

var cssvar = {
  primary: "#f5a51a",
  success: "#18a058",
  info: "#2080f0",
  warning: "#f0a020",
  error: "#d03050",
  default: "#333",
  fontSizeH1: "24px",
  fontSizeH2: "18px",
  fontSizeH3: "16px",
  fontSizeH4: "14px",
  fontSizeH5: "12px",
  pMargin: "10px"
};

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

const __default__ = defineComponent({
  name: "Button",
  props: {
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
  },
  setup(props) {
    const customTheme = inject("theme", null);
    const handleClick = (e) => {
      const { onClick } = props;
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
      composeVar.theme = props.color ? props.color : styleVar[props.type];
      if (props.color) {
        composeVar.color = isLight(props.color) ? "#000" : "#fff";
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
    return /* @__PURE__ */ React.createElement(Component, {
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
    }, /* @__PURE__ */ React.createElement("span", null, $slots.default && $slots.default()));
  }
});
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "c0152012": _ctx.cssVar.theme,
    "d218c20e": _ctx.buttonSizeVar.height,
    "1a0cfb7c": _ctx.buttonSizeVar.fontSize,
    "c1edacde": _ctx.cssVar.color,
    "30d22f02": _ctx.buttonSizeVar.padding,
    "c046a888": _ctx.cssVar.round,
    "e2b06abc": _ctx.buttonSizeVar.circle
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
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

var css_248z = ".flex-center[data-v-62261ac5] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-62261ac5] {\n  background: var(--c0152012);\n  height: var(--d218c20e);\n  font-size: var(--1a0cfb7c);\n  color: var(--c1edacde);\n  padding: var(--30d22f02);\n  box-sizing: border-box;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-62261ac5]:hover {\n  opacity: 0.7;\n}\n.cg-button.cg-button--round[data-v-62261ac5] {\n  border-radius: var(--c046a888);\n}\n.cg-button.cg-button--circle[data-v-62261ac5] {\n  border-radius: var(--e2b06abc);\n}\n.cg-button.cg-button--ghost[data-v-62261ac5] {\n  background: transparent;\n  border: 1px solid var(--c0152012);\n  color: var(--c0152012);\n}\n.cg-button.cg-button--ghost[data-v-62261ac5]:hover {\n  background: var(--c0152012);\n  color: var(--c1edacde);\n}\n.cg-button.cg-button--ghost.cg-button--dashed[data-v-62261ac5] {\n  border-style: dashed;\n}\n.cg-button.cg-button--disabled[data-v-62261ac5] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.cg-button.cg-button--text[data-v-62261ac5] {\n  border: none;\n  background: none;\n  color: var(--c0152012);\n}\n.cg-button.cg-button--default[data-v-62261ac5] {\n  border: 1px solid #eee;\n  color: #333;\n  background: #fff;\n}\n";
styleInject(css_248z);

__default__.__scopeId = "data-v-62261ac5";

const componentPrefix = "Cg";

var index = {
  install(app) {
    app.component(componentPrefix + __default__.name, __default__);
  }
};

export { index as default };
