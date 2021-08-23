import { defineComponent, provide } from 'vue';

const componentPrefix = "Cg";

var script = defineComponent({
  name: "ThemeConfig",
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

var index = {
  install(app) {
    app.component(componentPrefix + script.name, script);
  }
};

export { index as default };
