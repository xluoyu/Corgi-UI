<template>
  <div v-show="isShow" v-if="isLoad" class="cg-tab-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgTabItem',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject, getCurrentInstance, ref, onMounted, watchEffect, onUpdated } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar } from '@corgi/utils/index'
import { IThemeCssVar } from '@corgi/utils/type'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  name: String,
  lazy: Boolean,
})

const tabControl = inject('tabControl', null)
const activeLabel = tabControl.activeLabel

const isShow = computed(() => props.name === activeLabel.value)
const isLoad = ref(false)
const Instance = getCurrentInstance()

onUpdated(() => {
  if (props.lazy && !isLoad.value) {
    isLoad.value = isShow.value
  }
})

onMounted(() => {
  if (!props.lazy) {
    isLoad.value = true
  }
})
</script>

<style lang="less" scoped>
</style>
