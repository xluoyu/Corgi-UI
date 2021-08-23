import { componentPrefix } from '../../config';
import Space from './src/Space.vue';
export default {
    install(app) {
        app.component(componentPrefix + Space.name, Space);
    }
};
