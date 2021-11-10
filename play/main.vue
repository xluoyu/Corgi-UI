<template>
  <div class="main">
    <test ref="testRf" />
    <cg-tabs v-model="active" position="top" type="card">
      <cg-tab-item label="props" name="first">
        <cg-form-item label="滕子京" mode="inline">
          <template #label>
            <div class="label">
              <span>請輸入地名</span>
            </div>
          </template>
          <cg-input v-model="inputV" type="number" placeholder="哦哈哈哈哈哈" />
        </cg-form-item>

        <cg-form-item label="选择">
          <cg-select v-model="selectV" :options="options" />
        </cg-form-item>
      </cg-tab-item>
      <cg-tab-item label="哈哈哈哈" name="second" lazy>
        <template #label>
          <span>这是Vnode</span>
        </template>
        <span>没有什么</span>
      </cg-tab-item>
      <cg-tab-item label="菜擦" name="third">
        哈哈哈
      </cg-tab-item>
    </cg-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import play from './play.vue'
import test from './test.vue'
import { isString } from '@corgi/index'
import { Moon } from '@element-plus/icons'

const active = ref('first')

const inputV = ref('')
const selectV = ref('')
const options = [
  { label: '这是1', value: '1' },
  { label: '这是2', value: '2' },
  { label: '这是3', value: '3' },
]

const testRf = ref(null)
onMounted(() => {
  console.log(testRf.value.$.ctx.myAge)
})

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
.label{
  display: flex;
  align-items: center;
}
</style>
