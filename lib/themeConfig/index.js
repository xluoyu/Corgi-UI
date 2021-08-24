import { defineComponent, provide } from 'vue';

var script = defineComponent({
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

script.install = (app) => {
  app.component(script.name, script);
};
const _ThemeConfig = script;

export { _ThemeConfig as default };
