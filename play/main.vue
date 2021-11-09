
<template>
  <div class="main">
    <cg-tabs v-model="active" position="top" type="card">
      <cg-tab-item label="props" name="first">
        <cg-form-item label="滕子京" mode="inline">
          <template #label>
            <span>vnodehh </span>
          </template>
          <cg-input v-model="inputV" />
        </cg-form-item>
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

const active = ref('first')

const inputV = ref('')

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
