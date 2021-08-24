import { createVNode, isVNode, defineComponent, inject, computed, useCssVars, pushScopeId, popScopeId, openBlock, createElementBlock, createElementVNode, toDisplayString, resolveComponent, normalizeClass, Fragment, renderList, createBlock, provide, normalizeStyle, renderSlot, ref, reactive, onMounted } from 'vue';

var version = "0.0.1";

const componentPrefix = "Cg";

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
var styleVar$4 = Object.assign(cssvar, buttonVar);

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
const __default__$2 = defineComponent({
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
      let composeVar = customTheme ? assignThemecustom(customTheme, styleVar$4) : Object.assign({}, styleVar$4);
      composeVar.theme = props2.color ? props2.color : styleVar$4[props2.type];
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
const __injectCSSVars__$2 = () => {
  useCssVars((_ctx) => ({
    "6e1d63d7": _ctx.cssVar.theme,
    "014c9a4e": _ctx.buttonSizeVar.height,
    "4babc3bc": _ctx.buttonSizeVar.fontSize,
    "6d311d71": _ctx.cssVar.color,
    "e8195ec2": _ctx.buttonSizeVar.padding,
    "6e049f9c": _ctx.cssVar.round,
    "11e442fc": _ctx.buttonSizeVar.circle
  }));
};
const __setup__$2 = __default__$2.setup;
__default__$2.setup = __setup__$2 ? (props2, ctx) => {
  __injectCSSVars__$2();
  return __setup__$2(props2, ctx);
} : __injectCSSVars__$2;

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

var css_248z$5 = ".flex-center[data-v-14a5843b] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-14a5843b] {\n  background: var(--6e1d63d7);\n  height: var(--014c9a4e);\n  font-size: var(--4babc3bc);\n  color: var(--6d311d71);\n  padding: var(--e8195ec2);\n  box-sizing: border-box;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.cg-button[data-v-14a5843b]:hover {\n  opacity: 0.7;\n}\n.cg-button.cg-button--round[data-v-14a5843b] {\n  border-radius: var(--6e049f9c);\n}\n.cg-button.cg-button--circle[data-v-14a5843b] {\n  border-radius: var(--11e442fc);\n}\n.cg-button.cg-button--ghost[data-v-14a5843b] {\n  background: transparent;\n  border: 1px solid var(--6e1d63d7);\n  color: var(--6e1d63d7);\n}\n.cg-button.cg-button--ghost[data-v-14a5843b]:hover {\n  background: var(--6e1d63d7);\n  color: var(--6d311d71);\n}\n.cg-button.cg-button--ghost.cg-button--dashed[data-v-14a5843b] {\n  border-style: dashed;\n}\n.cg-button.cg-button--disabled[data-v-14a5843b] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.cg-button.cg-button--text[data-v-14a5843b] {\n  border: none;\n  background: none;\n  color: var(--6e1d63d7);\n}\n.cg-button.cg-button--default[data-v-14a5843b] {\n  border: 1px solid #eee;\n  color: #333;\n  background: #fff;\n}\n";
styleInject(css_248z$5);

__default__$2.__scopeId = "data-v-14a5843b";

__default__$2.install = (app) => {
  app.component(__default__$2.name, __default__$2);
};
const _Button = __default__$2;

const MenubarVar = {
  theme: cssvar.primary
};
var styleVar$3 = Object.assign(cssvar, MenubarVar);

const __default__$1 = defineComponent({
  name: "CgMenuItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      styleVar: styleVar$3
    };
  }
});
const __injectCSSVars__$1 = () => {
  useCssVars((_ctx) => ({
    "599cac58": _ctx.styleVar.color,
    "57c41f8c": _ctx.styleVar.theme
  }));
};
const __setup__$1 = __default__$1.setup;
__default__$1.setup = __setup__$1 ? (props, ctx) => {
  __injectCSSVars__$1();
  return __setup__$1(props, ctx);
} : __injectCSSVars__$1;

pushScopeId("data-v-48edf347");
const _hoisted_1$1 = { class: "cg-menu-item" };
const _hoisted_2$1 = ["href"];
popScopeId();
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("a", {
      href: _ctx.item.path
    }, toDisplayString(_ctx.item.label), 9, _hoisted_2$1)
  ]);
}

var css_248z$4 = ".cg-menu-item[data-v-48edf347] {\n  height: 42px;\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s;\n  color: #333;\n}\n.cg-menu-item[data-v-48edf347]:hover {\n  color: var(--599cac58);\n  background: var(--57c41f8c);\n}\n.cg-menu-item a[data-v-48edf347] {\n  color: inherit;\n  text-decoration: none;\n}\n";
styleInject(css_248z$4);

__default__$1.render = render$3;
__default__$1.__scopeId = "data-v-48edf347";

const __default__ = defineComponent({
  name: "CgMenu",
  components: { MenuItem: __default__$1 },
  props: {
    mode: {
      type: String,
      default: "vertical"
    },
    list: {
      type: Array,
      dafault: []
    }
  },
  setup(props) {
    let vars = {
      colorPrimary: "#332269"
    };
    return {
      vars
    };
  }
});
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "3b30cb1d": _ctx.vars.colorPrimary
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_menu_item = resolveComponent("menu-item");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["cg-menu", _ctx.mode])
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item) => {
      return openBlock(), createBlock(_component_menu_item, {
        item,
        key: item.key
      }, null, 8, ["item"]);
    }), 128))
  ], 2);
}

var css_248z$3 = ".cg-menu[data-v-0837e4a4] {\n  height: 100%;\n  --color-primary: var(--3b30cb1d);\n}\n.horizontal[data-v-0837e4a4] {\n  display: inline-flex;\n}\n";
styleInject(css_248z$3);

__default__.render = render$2;
__default__.__scopeId = "data-v-0837e4a4";

__default__.install = (app) => {
  app.component(__default__.name, __default__);
};
const _Menu = __default__;

var script$3 = defineComponent({
  name: "CgThemeConfig",
  props: {
    theme: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    if (props.theme) {
      provide("theme", props.theme);
    }
    return {};
  },
  render() {
    return this.$slots.default && this.$slots.default();
  }
});

script$3.install = (app) => {
  app.component(script$3.name, script$3);
};
const _ThemeConfig = script$3;

const SpaceVar = {};
var styleVar$2 = Object.assign(cssvar, SpaceVar);

var script$2 = defineComponent({
  name: "CgSpace",
  props: {
    align: {
      type: String,
      default: "start"
    },
    inline: Boolean,
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      styleVar: styleVar$2
    };
  },
  render() {
    let children = this.$slots.default && this.$slots.default();
    return /* @__PURE__ */ vueJsxCompat("div", {
      class: [
        "cg-space"
      ]
    }, children && children.length && children.map((child, index) => /* @__PURE__ */ vueJsxCompat("div", {
      style: {
        marginRight: children && index !== children.length ? "10px" : 0,
        marginBottom: "10px",
        marginTop: "10px"
      }
    }, child)));
  }
});

var css_248z$2 = ".cg-space[data-v-296f07a2] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center ;\n}\n";
styleInject(css_248z$2);

script$2.__scopeId = "data-v-296f07a2";

script$2.install = (app) => {
  app.component(script$2.name, script$2);
};
const _Space = script$2;

const IconVar = {};
var styleVar$1 = Object.assign(cssvar, IconVar);

var script$1 = defineComponent({
  name: "CgIcon",
  props: {
    size: String,
    color: String
  },
  setup() {
    return {
      styleVar: styleVar$1
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass([
      "cg-icon"
    ]),
    style: normalizeStyle({
      color: _ctx.color,
      fontSize: _ctx.size
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

var css_248z$1 = ".cg-icon[data-v-0cfc85f8] {\n  display: inline-block;\n  height: 1em;\n  width: 1em;\n  font-size: 1em;\n  fill: currentColor;\n  color: inherit;\n}\n";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-0cfc85f8";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Icon = script$1;

const ScrollbarVar = {};
var styleVar = Object.assign(cssvar, ScrollbarVar);

var script = defineComponent({
  name: "CgScrollbar",
  props: {
    y: Boolean,
    x: Boolean,
    show: {
      type: String,
      default: "hover"
    },
    thrumbClass: String,
    thrumbStyle: String,
    scrollClass: String,
    scrollStyle: String,
    loadHeight: Number,
    loadMore: Function
  },
  setup(props) {
    const containerEl = ref(null);
    let containerHeight = 0;
    const contentEl = ref(null);
    const verticalEl = ref(null);
    const vertical = reactive({
      el: null,
      height: 0,
      thrumbHeight: 0,
      thrumbY: 0
    });
    const getVerticalHeight = () => {
      let contentH = contentEl.value.clientHeight;
      vertical.thrumbHeight = containerHeight / contentH * vertical.height;
    };
    let hasLoad = false;
    const addScroll = () => {
      containerEl.value?.addEventListener("scroll", () => {
        let boxScrollTop = containerEl.value.scrollTop;
        let contentH = contentEl.value.clientHeight;
        vertical.thrumbY = boxScrollTop / contentH * vertical.height;
        if (props.loadMore && contentH - (boxScrollTop + containerHeight) < 50 && !hasLoad) {
          hasLoad = true;
          props.loadMore();
        }
      });
    };
    const update = () => {
      hasLoad = false;
      getVerticalHeight();
    };
    onMounted(() => {
      containerHeight = containerEl.value.clientHeight;
      vertical.height = vertical.el.clientHeight;
      getVerticalHeight();
      addScroll();
    });
    const thrumbVerticalMouseDown = (e) => {
      e.stopPropagation();
      let start = e.pageY;
      let contentH = contentEl.value.clientHeight;
      let scrollTop = containerEl.value.scrollTop;
      console.log("\u5F00\u59CB");
      const move = (event) => {
        let distance = event.pageY - start;
        containerEl.value.scrollTop = scrollTop + distance / vertical.height * contentH;
      };
      const up = () => {
        console.log("up");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    return {
      verticalEl,
      vertical,
      containerEl,
      update,
      thrumbVerticalMouseDown,
      contentEl,
      styleVar
    };
  }
});

pushScopeId("data-v-a7334a02");
const _hoisted_1 = {
  class: /* @__PURE__ */ normalizeClass([
    "cg-scrollbar"
  ])
};
const _hoisted_2 = {
  class: "scrollbar-container",
  ref: "containerEl"
};
const _hoisted_3 = {
  class: "scrollbar-content",
  ref: "contentEl"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("div", { class: "scrollbar-horizontal" }, null, -1);
popScopeId();
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        renderSlot(_ctx.$slots, "default")
      ], 512)
    ], 512),
    createElementVNode("div", {
      class: "scrollbar-vertical",
      ref: (el) => _ctx.vertical.el = el
    }, [
      createElementVNode("div", {
        class: "scrollbar-thrumb scrollbar-thrumb--vertical",
        style: normalizeStyle({
          height: _ctx.vertical.thrumbHeight + "px",
          transform: `translateY(${_ctx.vertical.thrumbY}px)`
        }),
        onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.thrumbVerticalMouseDown && _ctx.thrumbVerticalMouseDown(...args))
      }, null, 36)
    ], 512),
    _hoisted_4
  ]);
}

var css_248z = ".cg-scrollbar[data-v-a7334a02] {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.cg-scrollbar .scrollbar-container[data-v-a7334a02] {\n  overflow: auto;\n  height: inherit;\n}\n.cg-scrollbar .scrollbar-container[data-v-a7334a02]::-webkit-scrollbar {\n  display: none;\n}\n.cg-scrollbar .scrollbar-vertical[data-v-a7334a02] {\n  position: absolute;\n  right: 2px;\n  top: 2px;\n  bottom: 2px;\n  z-index: 2;\n}\n.cg-scrollbar .scrollbar-thrumb[data-v-a7334a02] {\n  position: relative;\n  width: 4px;\n  height: 40px;\n  background: #ffffff;\n  border-radius: 8px;\n  transform: translateY();\n  opacity: 0.4;\n  cursor: pointer;\n  user-select: none;\n}\n.cg-scrollbar .scrollbar-thrumb[data-v-a7334a02]:hover {\n  opacity: 0.7;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-a7334a02";

script.install = (app) => {
  app.component(script.name, script);
};
const _ScrollBar = script;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CgButton: _Button,
  CgMenu: _Menu,
  CgThemeConfig: _ThemeConfig,
  CgSpace: _Space,
  CgIcon: _Icon,
  CgScrollbar: _ScrollBar
});

const useToggle = (bol) => {
  const val = ref(bol);
  const changeValue = () => {
    val.value = !val.value;
  };
  return [val, changeValue];
};

const componentArray = Object.keys(components).map((key) => components[key]);
const create = {
  version,
  componentPrefix,
  install(app) {
    componentArray.forEach((component) => {
      app.use(component);
    });
  }
};

export { _Button as CgButton, _Icon as CgIcon, _Menu as CgMenu, _ScrollBar as CgScrollbar, _Space as CgSpace, _ThemeConfig as CgThemeConfig, create as default, useToggle };
