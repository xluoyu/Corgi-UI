import { defineComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from 'vue';
import cssvar from '../cg-style/index';

const IconVar = {};
var styleVar = Object.assign(cssvar, IconVar);

var script = defineComponent({
  name: "CgIcon",
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

var css_248z = ".cg-icon[data-v-0cfc85f8] {\n  display: inline-block;\n  height: 1em;\n  width: 1em;\n  font-size: 1em;\n  fill: currentColor;\n  color: inherit;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-0cfc85f8";

script.install = (app) => {
  app.component(script.name, script);
};
const _Icon = script;

export { _Icon as default };
