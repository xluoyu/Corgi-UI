import { defineComponent } from 'vue';
import styleVar from './styleVar';
export default defineComponent({
    name: 'CgMenuItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {
            styleVar
        };
    }
});
