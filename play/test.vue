<template>
  <div class="form">
    <input type="text" v-model="name">
    <div v-for="item in options" :key="item.label" class="form-item">
      <label>{{ item.label }}</label>
      <input v-if="item.type === 'text'" v-model="item.value">
      <select v-if="item.type === 'select'" v-model="item.value">
        <option v-for="op in item.options" :key="op" :value="op">{{ op }}</option>
      </select>
      <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
    </div>
    <cg-button @click="submit">提交</cg-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  options: Object,
  name: String
})

onMounted(() => {
  console.log('mount test')
})
const submit = () => {
  console.log(props.options)
  console.log(props.name)
}

const myAge = ref(132)

// defineExpose({
//   hhh: '哈哈哈'
// })
</script>

<style lang="scss" scoped>

</style>