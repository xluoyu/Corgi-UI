import { defineComponent, ref, reactive, onMounted, pushScopeId, popScopeId, openBlock, createElementBlock, createElementVNode, renderSlot, normalizeStyle, normalizeClass } from 'vue';

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

var css_248z = ".cg-scrollbar[data-v-a7334a02] {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.cg-scrollbar .scrollbar-container[data-v-a7334a02] {\n  overflow: auto;\n  height: inherit;\n}\n.cg-scrollbar .scrollbar-container[data-v-a7334a02]::-webkit-scrollbar {\n  display: none;\n}\n.cg-scrollbar .scrollbar-vertical[data-v-a7334a02] {\n  position: absolute;\n  right: 2px;\n  top: 2px;\n  bottom: 2px;\n  z-index: 2;\n}\n.cg-scrollbar .scrollbar-thrumb[data-v-a7334a02] {\n  position: relative;\n  width: 4px;\n  height: 40px;\n  background: #ffffff;\n  border-radius: 8px;\n  transform: translateY();\n  opacity: 0.4;\n  cursor: pointer;\n  user-select: none;\n}\n.cg-scrollbar .scrollbar-thrumb[data-v-a7334a02]:hover {\n  opacity: 0.7;\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-a7334a02";

script.install = (app) => {
  app.component(script.name, script);
};
const _ScrollBar = script;

export { _ScrollBar as default };
