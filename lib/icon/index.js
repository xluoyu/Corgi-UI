import { defineComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from 'vue';

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

const IconVar = {};
var styleVar = Object.assign(cssvar, IconVar);

var script = defineComponent({
  name: "Icon",
  props: {
    size: String,
    color: String
  },
  setup() {
    return {
      styleVar
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
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

var css_248z = ".cg-icon[data-v-336f8b08] {\n  display: inline-block;\n  height: 1em;\n  width: 1em;\n  font-size: 1em;\n  fill: currentColor;\n  color: inherit;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-336f8b08";

const componentPrefix = "Cg";

var index = {
  install(app) {
    app.component(componentPrefix + script.name, script);
  }
};

export { index as default };