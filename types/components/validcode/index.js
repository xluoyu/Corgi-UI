import Validcode from './src/Validcode.vue';
Validcode.install = app => {
    app.component(Validcode.name, Validcode);
};
const _Validcode = Validcode;
export default _Validcode;
