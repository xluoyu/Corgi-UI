import ThemeConfig from './src/ThemeConfig.vue';
ThemeConfig.install = (app) => {
    app.component(ThemeConfig.name, ThemeConfig);
};
const _ThemeConfig = ThemeConfig;
export default _ThemeConfig;
