<template>
  <div class="show">
    <component :is="config.name" v-bind="binds">
      <template #default>
        <div v-html="binds.content">
        </div>
      </template>
    </component>
  </div>
  <div class="control">
    <div class="form">
      <div v-for="item in options" :key="item.label" class="form-item">
        <label>{{ item.label }}</label>
        <input v-if="item.type === 'text'" v-model="item.value">
        <input v-if="item.type === 'slot' && item.slot === 'default'" v-model="item.value">
        <select v-if="item.type === 'select'" v-model="item.value">
          <option v-for="op in item.options" :key="op" :value="op">{{ op }}</option>
        </select>
        <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
      </div>

      <cg-button type="success" @click="regsiter">重置</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref, getCurrentInstance, h, render, compile, defineComponent } from 'vue'
import config from './config'
import { isString } from '@corgi/utils'
export default defineComponent({
  setup() {
    const options = reactive(config.options)
    const binds = computed(() => {
      return Object.keys(options).reduce((pre, cur) => {
        // if (options[cur].type === 'slot') {
        // console.log(options[cur].value)
        // pre[cur] = (new Function('h',`return ` + options[cur].value))(h)
        // console.log(pre[cur])
        // let newDom = document.createElement('div')
        // newDom.innerHTML = options[cur].value
        // console.log(newDom)
        // pre[cur] = newDom.firstChild
        // } else {
        pre[cur] = options[cur].value
        // }
        return pre
      }, {})
    })

    console.log(binds.value)

    const onLoadStatus = ref(true)
    const internalInstance = getCurrentInstance()
    const regsiter = () => {
      console.log(internalInstance)
    }

    return {
      config,
      options,
      binds,
    }
  },
  // render () {
  //   const comp = () => {
  //     return this.config.name
  //   }
  //   return (
  //     <div>
  //       <div class="show">
  //         {

  //         }
  //       </div>
  //     </div>
  //   )
  // },
})


</script>

<style lang="scss" scoped>

</style>
