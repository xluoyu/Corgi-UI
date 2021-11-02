<template>
  <div>
    <ControlBox
      :key="id"
      :config="config"
      @reset="reset"
    />
  </div>
</template>

<script lang="ts" setup>
import ControlBox from './control.vue'
import config from './config'
import { nextTick, ref } from 'vue'

const loadStatus = ref(true)
const id = ref(new Date())
const reset = () => {
  // loadStatus.value = false
  id.value = new Date()
  // nextTick(() => {
  //   loadStatus.value = true
  //   console.log(config)
  // })
}

</script>

<style lang="scss" scoped>

</style>
