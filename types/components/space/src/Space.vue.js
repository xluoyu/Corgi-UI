import { defineComponent } from 'vue';
import styleVar from './styleVar';
export default defineComponent({
    name: 'CgSpace',
    props: {
        align: {
            type: String,
            default: 'start'
        },
        inline: Boolean,
        wrap: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        return {
            styleVar
        };
    },
    render() {
        let children = this.$slots.default && this.$slots.default();
        return (<div class={[
                'cg-space'
            ]}>
        {children && children.length && children.map((child, index) => (<div style={{
                    marginRight: children && index !== children.length ? '10px' : 0,
                    marginBottom: '10px',
                    marginTop: '10px'
                }}>
              {child}
            </div>))}
      </div>);
    }
});
