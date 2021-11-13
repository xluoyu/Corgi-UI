
<template>
  <div class="control-box">
    <div class="header-bar">
      <cg-space>
        <cg-tooltip content="重置">
          <div class="flex-center pointer icon-button" @click="reset">
            <cg-icon><Refresh /></cg-icon>
          </div>
        </cg-tooltip>
        <cg-tooltip content="切换主题">
          <div class="flex-center pointer icon-button" @click="toggleIsDark">
            <cg-icon v-show="isDark"><Moon /></cg-icon>
            <cg-icon v-show="!isDark"><Sunny /></cg-icon>
          </div>
        </cg-tooltip>
        <cg-tooltip content="生成代码">
          <div class="flex-center pointer icon-button">
            <cg-icon><Tickets /></cg-icon>
          </div>
        </cg-tooltip>
      </cg-space>
    </div>
    <div class="flex-center canvas" :style="{background: isDark ? '#18181c' : '#fff'}">
      <component
        :is="config.name"
        v-model="vmodel"
        v-bind="binds"
        v-on="eventsBind"
      >
        <template v-for="item in slots" :key="item.key" #[item.key]>
          <component :is="item.vnode" />
        </template>
      </component>
    </div>
    <div class="control">
      <cg-tabs>
        <cg-tab-item label="Props" name="props">
          <cg-form>
            <cg-form-item v-if="props.config.vmodel" label="v-model">
              <cg-input v-model.lazy="vmodel" />
            </cg-form-item>
            <cg-form-item v-for="item in options" :key="item.label" :label="item.label">
              <cg-input v-if="item.type === 'text'" v-model.lazy="item.value" />
              <cg-input v-if="item.type === 'code'" v-model.lazy="item.value" readonly />
              <cg-select v-if="item.type === 'select'" v-model="item.value" :options="item.options" />
              <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
            </cg-form-item>
          </cg-form>
        </cg-tab-item>
        <cg-tab-item label="Slot" name="slot">
          <div class="cg-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>字段</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in slots" :key="item.label" class="form-item">
                  <td>{{ item.label }}</td>
                  <td>{{ item.key }}</td>
                  <td>
                    <cg-input v-model.lazy="item.value" type="textarea" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </cg-tab-item>
        <cg-tab-item label="Events" name="events">
          <div class="form">
            <div v-for="item in events" :key="item.label" class="form-item">
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
import { defineComponent, computed, reactive, ref, compile, onUpdated, onMounted, watchEffect } from 'vue'
import { cloneDeep } from 'lodash'

const props = defineProps({
  config:Object,
})


let vmodel = props.config.vmodel ? ref(props.config.vmodel) : ''
let options = reactive(cloneDeep(props.config.props) || [])
let slots = reactive(cloneDeep(props.config.slots) || [])
let events = reactive(cloneDeep(props.config.events) || [])
const binds = computed(() => {
  let attrs = options.reduce((pre, cur) => {
    if (cur.type == 'code') {
      pre[cur.key] = new Function('return ' + cur.value)()
    } else {
      pre[cur.key] = cur.value
    }
    return pre
  }, {})

  return attrs
})

const eventsBind = computed(() => {
  return events.reduce((pre, cur) => {
    pre[cur.key] = new Function('return ' + cur.value)()
    return pre
  }, {})
})

watchEffect(() => {
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
