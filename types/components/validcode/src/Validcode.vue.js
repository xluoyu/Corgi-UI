export default defineComponent({
    name: 'CgValidCode',
});
import { defineComponent as _defineComponent } from 'vue';
import { computed, defineComponent } from 'vue';
import { ElInput } from 'element-plus';
const __default__ = defineComponent({
    name: 'CgValidCode',
});
export default _defineComponent({
    ...__default__,
    props: {
        modelValue: String,
    },
    emits: ['update:modelValue'],
    setup(__props, { expose, emit }) {
        expose();
        const props = __props;
        const input = computed({
            get: () => props.modelValue,
            set: val => {
                emit('update:modelValue', val);
            },
        });
        const getCode = () => { console.log('获取验证码'); };
        const __returned__ = { props, emit, input, getCode, ElInput };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
});
