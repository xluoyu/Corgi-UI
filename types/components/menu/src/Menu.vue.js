import { defineComponent } from 'vue';
import MenuItem from './MenuItem.vue';
export default defineComponent({
    name: 'CgMenu',
    components: { MenuItem },
    props: {
        mode: {
            type: String,
            default: 'vertical'
        },
        list: {
            type: Array,
            dafault: []
        }
    },
    setup(props) {
        let vars = {
            colorPrimary: '#332269'
        };
        return {
            vars
        };
    }
});
