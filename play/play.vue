
<template>
  <div class="main">
    <cg-button @click="submit">提示</cg-button>

    <cg-card
      title="这里是标题"
      border
      size="mini"
      show-close
    >
      这里是内容
    </cg-card>

    <cg-alert
      type="info"
      show-icon
      show-close
      @onClose="onClose"
    >
      <template #title>
        <div class="title">{{ text }}</div>
      </template>
      <div class="content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈啊沙发沙发沙发阿萨的程序从v吧豆腐干豆腐干</div>
    </cg-alert>

    <cg-button size="small" ghost @click="getPos">hhh</cg-button>
    <cg-button
      size="small"
      ghost
      type="error"
      @click="change"
    >
      hhh
    </cg-button>

    <cg-message />
    <br>
    <!-- <cg-switch size="mini" /> -->
    <cg-switch
      active-text="哈哈哈哈"
      inactive-text="nonono"
      inside-text
      active-text-color="#ff0000"
      @change="changeSwitch"
    />

    <div id="b1" v-cg-loading="loadingVal" class="box">
      <span>1654646</span>
    </div>
    <br>
    <br>
    <br>
    <cg-switch
      active-text="哈哈哈哈"
      inactive-text="nonono"
      inside-text
      active-text-color="#ff0000"
      @change="changeSwitch2"
    />

    <div id="b2" v-cg-loading="loadingVal2" class="box">
      <span>1654646</span>
    </div>

    <!-- <cg-switch size="large" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'Play',
})
</script>

<script lang="ts" setup>
import { useConfirm } from '@corgi/index'
import { h, ref } from 'vue'

const onClose = () => {
  console.log('检测到关闭了')
}

const text = ref('16546513135')
const change = () => {
  text.value = '1654841'
}

const activeText = h => {
  return h('div', {}, '哈哈哈哈')
}

const loadingVal = ref(false)
const changeSwitch = val => {
  loadingVal.value = val
}

const loadingVal2 = ref(false)
const changeSwitch2 = val => {
  loadingVal2.value = val
}

const getPos = () => {
  console.log('开始获取')
  navigator.geolocation.getCurrentPosition(function(position) {
  // do_something(position.coords.latitude, position.coords.longitude)
    console.log('-------', position.coords)
  }, err=> {
    console.log('err', err)
  })
}

const submit = () => {
  useConfirm({
    title: '哈哈哈',
    content: h('div', {}, '这是节点'),
  }).then(() => {
    console.log('确定额')
  }).catch(() => {
    console.log('取消')
  })
}


const confirmRef = ref(null)

</script>

<style lang="less" scoped>
.main{
  width: 800px;
}
.box{
  width: 200px;
  height: 300px;
  background: skyblue;
}
</style>
