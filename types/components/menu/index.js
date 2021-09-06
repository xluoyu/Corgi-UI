import Menu from './src/Menu.vue';
Menu.install = app => {
    app.component(Menu.name, Menu);
};
export const CgMenu = Menu;
