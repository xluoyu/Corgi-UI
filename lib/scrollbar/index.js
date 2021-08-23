import { defineComponent, ref, openBlock, createElementBlock, toDisplayString } from 'vue';

var script = defineComponent({
  setup() {
    const name = ref("\u5C0F\u660E");
    console.log("test");
    const size = ref("19px");
    return {
      name,
      size
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, " hello, " + toDisplayString(_ctx.name), 1);
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

var css_248z = ".flex-center[data-v-659f86a8] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\ndiv[data-v-659f86a8] {\n  font-size: 18px;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-659f86a8";

export { script as default };
