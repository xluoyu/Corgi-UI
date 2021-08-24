import { defineComponent, useCssVars, pushScopeId, popScopeId, openBlock, createElementBlock, createElementVNode, toDisplayString, resolveComponent, normalizeClass, Fragment, renderList, createBlock } from 'vue';

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

const MenubarVar = {
  theme: cssvar.primary
};
var styleVar = Object.assign(cssvar, MenubarVar);

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
      styleVar
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

var css_248z$1 = ".cg-menu-item[data-v-48edf347] {\n  height: 42px;\n  padding: 0 20px;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s;\n  color: #333;\n}\n.cg-menu-item[data-v-48edf347]:hover {\n  color: var(--599cac58);\n  background: var(--57c41f8c);\n}\n.cg-menu-item a[data-v-48edf347] {\n  color: inherit;\n  text-decoration: none;\n}\n";
styleInject(css_248z$1);

__default__$1.render = render$1;
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

var css_248z = ".cg-menu[data-v-0837e4a4] {\n  height: 100%;\n  --color-primary: var(--3b30cb1d);\n}\n.horizontal[data-v-0837e4a4] {\n  display: inline-flex;\n}\n";
styleInject(css_248z);

__default__.render = render;
__default__.__scopeId = "data-v-0837e4a4";

__default__.install = (app) => {
  app.component(__default__.name, __default__);
};
const _Menu = __default__;

export { _Menu as default };
