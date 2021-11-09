
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
          <div class="flex-center pointer icon-button" @click="toggleIsDark">
            <cg-icon v-show="isDark"><Moon /></cg-icon>
            <cg-icon v-show="!isDark"><Sunny /></cg-icon>
          </div>
        </cg-tooltip>
        <cg-tooltip content="生成代码" position="top">
          <div class="flex-center pointer icon-button">
            <cg-icon><Tickets /></cg-icon>
          </div>
        </cg-tooltip>
      </cg-space>
    </div>
    <div class="canvas" :style="{background: isDark ? '#333' : '#fff'}">
      <component :is="config.name" v-bind="binds">
        <template v-for="item in slots" :key="item.key" #[item.key]>
          <!-- <div v-html="item.value"></div> -->
          <component :is="item.vnode" />
        </template>
      </component>
    </div>
    <div class="control">
      <cg-tabs>
        <cg-tab-item label="Props" name="props">
          <div class="form">
            <div v-for="item in options" :key="item.label" class="form-item">
              <label>{{ item.label }}</label>
              <input v-if="item.type === 'text'" v-model="item.value">
              <select v-if="item.type === 'select'" v-model="item.value">
                <option v-for="op in item.options" :key="op" :value="op">{{ op }}</option>
              </select>
              <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
            </div>
          </div>
        </cg-tab-item>
        <cg-tab-item label="Slot" name="slot">
          <div class="form">
            <div v-for="item in slots" :key="item.label" class="form-item">
              <label>{{ item.label }}</label>
              <input v-model="item.value">
            </div>
          </div>
        </cg-tab-item>
      </cg-tabs>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ControlBox',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, reactive, ref, compile, getCurrentInstance, onUpdated, onMounted } from 'vue'
import { cloneDeep } from 'lodash'
import { Refresh, Moon, Sunny, Tickets } from '@element-plus/icons'

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


onUpdated(() => {
  console.log('up')
  slots.forEach(item => {
    item.vnode = compile(item.value)
    console.log(item.vnode)
  })
})

onMounted(() => {
  slots.forEach(item => {
    item.vnode = compile(item.value)
  })
})

const emits = defineEmits(['reset'])

const isDark = ref(false)
const toggleIsDark = () => isDark.value = !isDark.value

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
  padding: 40px 20px;
  position: relative;
  transition: all .3s;
}
.control{
  width: 100%;
  padding: 0 20px 20px;
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
