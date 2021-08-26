import Button from './src/Button.vue';
Button.install = (app) => {
    app.component(Button.name, Button);
};
const _Button = Button;
export default _Button;
