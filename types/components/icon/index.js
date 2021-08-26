import Icon from './src/Icon.vue';
Icon.install = (app) => {
    app.component(Icon.name, Icon);
};
const _Icon = Icon;
export default _Icon;
