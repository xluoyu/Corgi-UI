
<template>
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
</template>

<script lang="ts">
export default defineComponent({
  name: 'ControlBox',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, reactive } from 'vue'
import { cloneDeep } from 'lodash'

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


const reset = () => {
  emits('reset')
}

</script>

<style lang="less" scoped>

</style>
