<template>
  <div>
    hello, {{name}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const name = ref('小明')
    console.log('test')
    const size = ref('19px')
    return {
      name,
      size
    }
  }
})
</script>

<style lang="less" scoped>

div{
  font-size: 18px;
}
</style>