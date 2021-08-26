import Menu from './src/Menu.vue';
Menu.install = (app) => {
    app.component(Menu.name, Menu);
};
const _Menu = Menu;
export default _Menu;
