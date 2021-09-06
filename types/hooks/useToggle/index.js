import { ref } from 'vue';
import { warn } from '..\../utils/warn';
export const useToggle = (bol) => {
    if (typeof bol !== 'boolean')
        warn('useToggle', '参数不是boolean');
    const val = ref(bol);
    const changeValue = () => { val.value = !val.value; };
    return [val, changeValue];
};
export const useWarn = (title, content) => {
    warn(title, content);
};
