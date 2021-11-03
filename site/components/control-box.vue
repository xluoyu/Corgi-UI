
<template>
  <div class="control-box">
    <div class="header-bar">
      <cg-space>
        <cg-popover content="哈哈哈哈哈" />
        <cg-tooltip content="重置">
          <cg-button type="success">实施</cg-button>
          <cg-button type="success">哈哈哈</cg-button>
        </cg-tooltip>
      </cg-space>
      <cg-icon><Refresh /></cg-icon>
      <cg-icon><Moon /></cg-icon>
      <cg-icon><Tickets /></cg-icon>
    </div>
    <div class="canvas">
      <component :is="config.name" v-bind="binds">
        <template v-for="item in slots" :key="item.key" #[item.key]>
          <div v-html="item.value"></div>
        </template>
      </component>
    </div>
    <div class="control">
      <cg-button type="warning" @click="reset">重置</cg-button>
      <div class="form">
        <h3>props</h3>
        <div v-for="item in options" :key="item.label" class="form-item">
          <label>{{ item.label }}</label>
          <input v-if="item.type === 'text'" v-model="item.value">
          <select v-if="item.type === 'select'" v-model="item.value">
            <option v-for="op in item.options" :key="op" :value="op">{{ op }}</option>
          </select>
          <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
        </div>
      </div>
      <div class="form">
        <h3>slot</h3>
        <div v-for="item in slots" :key="item.label" class="form-item">
          <label>{{ item.label }}</label>
          <input v-model="item.value">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ControlBox',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { Refresh, Moon, Sunny, Tickets } from '@element-plus/icons'

const props = defineProps({
  config:Object,
})

let options = reactive(cloneDeep(props.config.props))
let slots = reactive(cloneDeep(props.config.slots))
const binds = computed(() => {
  return options.reduce((pre, cur) => {
    pre[cur.key] = cur.value
    return pre
  }, {})
})

const emits = defineEmits(['reset'])


const openControl = ref(false)

const reset = () => {
  emits('reset')
}

</script>

<style lang="less" scoped>
.control-box{
  font-size: 14px;
  background: #fff;
}
.header-bar{
  color: #666;
  border-bottom: 1px solid #eee;
}
.canvas{
  padding: 60px 20px;
  position: relative;
}
.control{
  width: 100%;
  border: 1px solid #eee;
}
</style>
