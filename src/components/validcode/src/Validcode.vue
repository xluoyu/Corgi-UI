<template>
  <div
    class="cg-validcode"
  >
    <el-input v-model="input" placeholder="请输入内容" />
    <div @click="getCode">获取验证码</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgValidCode',
})
</script>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import { ElInput } from 'element-plus'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const input = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
  },
})

const getCode = () => { console.log('获取验证码') }

</script>

<style lang="less" scoped>

</style>
