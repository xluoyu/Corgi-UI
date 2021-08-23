import Icon from './src/Icon.vue';
import { componentPrefix } from '@/config';
export default {
    install(app) {
        app.component(componentPrefix + Icon.name, Icon);
    }
};
