import { defineComponent } from 'vue';
import styleVar from './styleVar';
export default defineComponent({
    name: 'CgIcon',
    props: {
        size: String,
        color: String
    },
    setup() {
        return {
            styleVar
        };
    }
});
