import Button from './src/Button.vue';
import { componentPrefix } from '@/config';
export default {
    install(app) {
        app.component(componentPrefix + Button.name, Button);
    }
};
