import Space from './src/Space.vue';
Space.install = (app) => {
    app.component(Space.name, Space);
};
const _Space = Space;
export default _Space;
