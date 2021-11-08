
<template>
  <div class="main">
    <cg-tabs v-model="active" position="right" type="card">
      <!-- <template #header="{labels}">
        <div class="my-tab-header">
          <template v-for="item in labels" :key="item">
            <div v-if="isString(item.label)" class="myLbarl">还好{{ item.label }}</div>
            <component :is="item.label" v-else />
          </template>
        </div>
      </template> -->
      <cg-tab-item label="props" name="first" lazy>
        <p>没有什么没有什么没有什么没有什么没有什么</p>
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
import { isString } from '@corgi/index'

const active = ref('second')

// setTimeout(() => {
//   active.value = 'third'
// }, 1000)
</script>

<style lang="less">
*{margin: 0;padding: 0}
html{
  background: #f1f1f1;
}
.main{
  width: 800px;
  height: 300px;
  border:1px solid #eee;
  margin: 80px;
  background: #fff;
}
</style>
