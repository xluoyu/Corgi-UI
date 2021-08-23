import { defineComponent, unref, computed, useCssVars, pushScopeId, popScopeId, openBlock, createElementBlock, createElementVNode, toDisplayString, resolveComponent, normalizeClass, Fragment, renderList, createBlock } from 'vue';

const componentPrefix = "Cg";

function warn(location, message) {
  console.error(`[Corgi/${location}]: ${message}`);
}

const getBodyVar = (el, key) => {
  let bodyEl = document.querySelector(el);
  return getComputedStyle(bodyEl).getPropertyValue(key);
};
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
const getCssVar = () => {
  let colorPrimary = getBodyVar("body", "--color-primary");
  return {
    hoverBackground: colorToRgba(colorPrimary, 0.7),
    hoverColor: isLight(colorPrimary) ? "#000" : "#fff"
  };
};

const __default__$1 = defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    let {
      hoverBackground,
      hoverColor
    } = unref(computed(getCssVar));
    return {
      hoverBackground,
      hoverColor
    };
  }
});
const __injectCSSVars__$1 = () => {
  useCssVars((_ctx) => ({
    "6f570450": _ctx.hoverColor,
    "73b2c7d9": _ctx.hoverBackground
  }));
};
const __setup__$1 = __default__$1.setup;
__default__$1.setup = __setup__$1 ? (props, ctx) => {
  __injectCSSVars__$1();
  return __setup__$1(props, ctx);
} : __injectCSSVars__$1;

pushScopeId("data-v-556dcd6b");
const _hoisted_1 = { class: "cg-menu-item" };
const _hoisted_2 = ["href"];
popScopeId();
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("a", {
      href: _ctx.item.path
    }, toDisplayString(_ctx.item.label), 9, _hoisted_2)
  ]);
}

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

var css_248z$1 = ".cg-menu-item[data-v-556dcd6b] {\n  height: 42px;\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s;\n  color: #333;\n}\n.cg-menu-item[data-v-556dcd6b]:hover {\n  color: var(--6f570450);\n  background: var(--73b2c7d9);\n}\n.cg-menu-item a[data-v-556dcd6b] {\n  color: inherit;\n  text-decoration: none;\n}\n";
styleInject(css_248z$1);

__default__$1.render = render$1;
__default__$1.__scopeId = "data-v-556dcd6b";

const __default__ = defineComponent({
  name: "Menu",
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
    "2168d39b": _ctx.vars.colorPrimary
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;

function render(_ctx, _cache, $props, $setup, $data, $options) {
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

var css_248z = ".cg-menu[data-v-15151fe8] {\n  height: 100%;\n  --color-primary: var(--2168d39b);\n}\n.horizontal[data-v-15151fe8] {\n  display: inline-flex;\n}\n";
styleInject(css_248z);

__default__.render = render;
__default__.__scopeId = "data-v-15151fe8";

var index = {
  install(app) {
    app.component(componentPrefix + __default__.name, __default__);
  }
};

export { index as default };
