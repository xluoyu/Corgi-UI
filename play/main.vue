<template>
  <!-- <cg-theme-config :theme="themeConfig">
    <play />
  </cg-theme-config> -->
  <test :options="options" @submit="submit" />
</template>

<script lang="ts" setup>
import { reactive } from '@vue/reactivity'
import { ref } from 'vue'
import Play from './play.vue'
import test from './test.vue'

const themeConfig = {
  menu: {
    color: 'red',
  },
}

const options = reactive({
  name: {
    type: 'text',
    value: '哈哈哈',
    label: '名字',
  },
  age: {
    type: 'text',
    value: '23',
    label: '年龄',
  },
})
const name = ref('王五')

const submit = () => {
  console.log(name.value)
  console.log(options)
}
</script>

<style lang="scss" scoped>

</style>
