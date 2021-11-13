<template>
  <div class="container">
    <cg-button style="position: fixed; z-index: 9999" @click="end">测试</cg-button>
    <cg-tabs
      v-model="active"
      position="top"
      type="card"
      bulge
    >
      <cg-tab-item label="props" name="first">
        <cg-form-item label="滕子京" mode="inline">
          <template #label>
            <div class="label">
              <span>請輸入地名</span>
            </div>
          </template>
          <cg-input v-model="inputV" />
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

    <!-- <cg-dialog title="这是标题">
      <div>
        这里是一些内容
      </div>
      <template #footer>
        <cg-button ghost>取消</cg-button>
        <cg-button type="success">提交</cg-button>
      </template>
    </cg-dialog> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import play from './play.vue'
import { isString, useShowMask, useConfirm } from '@corgi/index'
import { Moon } from '@element-plus/icons'

const active = ref('first')

const inputV = ref('')
const selectV = ref('asd')
const options = [
  { label: '这是1', value: '1' },
  { label: '这是2', value: '2' },
  { label: '这是3', value: '3' },
]

const testRf = ref(null)
let timer = null
// setTimeout(() => {
//   active.value = 'third'
// }, 1000)
const { status, show, close } = useShowMask()
// useConfirm.error({
//   title: '这是标题',
//   content: '这是内容',
// })
const end = () => {
  if (status.value) {
    close()
  } else {
    show()
  }
}
</script>

<style lang="less">
*{margin: 0;padding: 0}
html{
  background: #f1f1f1;
}
.container{
  width: 800px;
  height: 500px;
  border:1px solid #eee;
  margin: 80px;
  background: #fff;
}
.label{
  display: flex;
  align-items: center;
}
</style>
