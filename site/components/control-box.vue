
<template>
  <div class="control-box">
    <div class="header-bar">
      <cg-space>
        <cg-tooltip content="重置" position="top">
          <div class="flex-center pointer icon-button">
            <cg-icon><Refresh /></cg-icon>
          </div>
        </cg-tooltip>
        <cg-tooltip content="切换主题" position="top">
          <div class="flex-center pointer icon-button">
            <cg-icon><Moon /></cg-icon>
          </div>
        </cg-tooltip>
        <cg-tooltip content="生成代码" position="top">
          <div class="flex-center pointer icon-button">
            <cg-icon><Tickets /></cg-icon>
          </div>
        </cg-tooltip>
      </cg-space>
    </div>
    <div class="canvas">
      <component :is="config.name" v-bind="binds">
        <template v-for="item in slots" :key="item.key" #[item.key]>
          <!-- <div v-html="item.value"></div> -->
          <component :is="item.vnode" />
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
import { defineComponent, computed, reactive, ref, compile, getCurrentInstance, onUpdated, createVNode, onMounted } from 'vue'
import { cloneDeep } from 'lodash'
import { Refresh, Moon, Sunny, Tickets } from '@element-plus/icons'
import { baseCompile, baseParse, transform } from '@vue/compiler-dom'
import * as runtimeDom from '@vue/runtime-dom'


const props = defineProps({
  config:Object,
})

let options = reactive(cloneDeep(props.config.props))
let slots = reactive(props.config.slots)
const binds = computed(() => {
  return options.reduce((pre, cur) => {
    pre[cur.key] = cur.value
    return pre
  }, {})
})
const Instance = getCurrentInstance()

console.log(Instance)
const htmlToVnode = (html: string) => {
  const baseComp = baseCompile(html, {
  })
  console.log(baseComp)
  const compRender = new Function('Vue', baseComp.code)(runtimeDom)
  return compRender({})
}

onUpdated(() => {
  slots.forEach(item => {
    item.vnode = htmlToVnode(item.value)
  })

})

onMounted(() => {
  slots.forEach(item => {
    item.vnode = htmlToVnode(item.value)
  })
  console.log(slots)

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
.handle{
  width: 620px;
  height: 80px;
}
.icon-button{
  width: 40px;
  height: 40px;
  font-size: var(--fontSize-2);
}
</style>
