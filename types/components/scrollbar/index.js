import ScrollBar from './src/Scrollbar.vue';
ScrollBar.install = (app) => {
    app.component(ScrollBar.name, ScrollBar);
};
const _ScrollBar = ScrollBar;
export default _ScrollBar;
