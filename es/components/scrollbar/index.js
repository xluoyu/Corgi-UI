import { componentPrefix } from '../../config';
import ScrollBar from './src/ScrollBar.vue';
export default {
    install(app) {
        app.component(componentPrefix + ScrollBar.name, ScrollBar);
    }
};
