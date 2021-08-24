import { createVNode, isVNode, defineComponent } from 'vue';

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

const SpaceVar = {};
var styleVar = Object.assign(cssvar, SpaceVar);

// Copy from vite/src/client/vueJsxCompat.ts

const slice = Array.prototype.slice;

function vueJsxCompat(tag, props = null, children = null) {
  if (arguments.length > 3 || isVNode(children)) {
    children = slice.call(arguments, 2);
  }
  return createVNode(tag, props, children);
}

var script = defineComponent({
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
      styleVar
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

var css_248z = ".cg-space[data-v-296f07a2] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center ;\n}\n";
styleInject(css_248z);

script.__scopeId = "data-v-296f07a2";

script.install = (app) => {
  app.component(script.name, script);
};
const _Space = script;

export { _Space as default };
