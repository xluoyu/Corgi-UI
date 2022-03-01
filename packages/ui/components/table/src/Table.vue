<template>
  <div
    class="cg-table"
  >
    <table>
    </table>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CgTable',
})
</script>

<script lang="ts" setup>
import { defineComponent, computed, inject } from 'vue'
import styleVar from './styleVar'
import { getComponentCssVar, getGlobalCssVar, IThemeCssVar } from '@corgi-box/ui/utils'
import { useGroupHeader } from './use-group-header'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
})

const customTheme = inject<IThemeCssVar>('theme', null)
const globalCssVar = getGlobalCssVar(customTheme)
let cssVar = computed(() => {
  const componentCssVar = getComponentCssVar('Table', customTheme, styleVar)

  return componentCssVar
})

const list = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Attrs',
    key: 'attrs',
    children: [
      {
        title: 'Attack',
        key: 'attack',
        children: [
          {
            title: 'Physics Attack',
            key: 'physicsAttack',
          },
          {
            title: 'Magic Attack',
            key: 'magicAttack',
          },
        ],
      },
      {
        title: 'Defend',
        key: 'defend',
      },
      {
        title: 'Speed',
        key: 'speed',
      },
    ],
  },
]
const res = useGroupHeader(list)
console.log(res)
</script>

<style lang="less" scoped>

</style>
