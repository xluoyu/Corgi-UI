import ThemeConfig from './src/ThemeConfig.vue';
ThemeConfig.install = app => {
    app.component(ThemeConfig.name, ThemeConfig);
};
export const CgThemeConfig = ThemeConfig;
