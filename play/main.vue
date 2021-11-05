
<template>
  <div class="main">
    <cg-tabs v-model="active">
      <cg-tab-item label="props" name="first" lazy>
        <play />
      </cg-tab-item>
      <cg-tab-item label="哈哈哈哈" name="second" lazy>
        <template #label>
          <span>这是Vnode</span>
        </template>
        <span>没有什么</span>
      </cg-tab-item>
      <cg-tab-item label="菜擦" name="third" lazy>
        <test />
      </cg-tab-item>
    </cg-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import play from './play.vue'
import test from './test.vue'

const active = ref('second')

// setTimeout(() => {
//   active.value = 'third'
// }, 1000)
</script>

<style lang="less">
*{margin: 0;padding: 0}
.main{
  width: 800px;
  height: 800px;
  border:1px solid #eee;
}
</style>
