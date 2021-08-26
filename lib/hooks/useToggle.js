import { ref } from 'vue';
import { warn } from '../utils/warn';

const useToggle = (bol) => {
  if (typeof bol !== "boolean")
    warn("useToggle", "\u53C2\u6570\u4E0D\u662Fboolean");
  const val = ref(bol);
  const changeValue = () => {
    val.value = !val.value;
  };
  const test = () => {
    warn("useToggle", "\u53C2\u6570\u4E0D\u662Fboolean");
  };
  return [val, changeValue, test];
};
const useWarn = (title, content) => {
  warn(title, content);
};

export { useToggle, useWarn };
