<template>

  <div style="margin: 20px">

    <cg-theme-config :theme="themeConfig">
      <cg-button size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
      <cg-button size="small" style="margin-right: 10px;" type="success" disabled @click="btnTest">small</cg-button>
      <cg-button
        size="medium"
        style="margin-right: 10px;"
        type="info"
        disabled
      >
        medium
      </cg-button>
      <cg-button size="large" style="margin-right: 10px;" type="warning" :loading="btnLoad" @click="changeLoad">
        <template v-slot:icon>
          <cg-icon>
            <collectionTag />
          </cg-icon>
        </template>
          large
      </cg-button>
      <cg-button
        size="medium"
        style="margin-right: 10px;"
        type="info"
        ghost
        dashed
        v-copy="nextFn"
      >
        ghost
      </cg-button>
      <cg-button text style="font-size: 18px;color: #ffac4e">
        <cg-icon>
          <collection-tag />
        </cg-icon>
      </cg-button>
    </cg-theme-config>

    <cg-icon size="34px" color="#336699">
      <edit />
    </cg-icon>

    <div style="width: 33px;
height: 36px;
background: linear-gradient(180deg, #305ACB 0%, #1B3B99 100%);"></div>

    <div class="test-scrollbar">
      <cg-scrollbar
        ref="scroll"
        y
        x
        :load-more="loadMore"
      >
        <div class="main" :style="{height: mainHeight + 'px'}"></div>
      </cg-scrollbar>
    </div>

  </div>


</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Edit, CollectionTag } from '@element-plus/icons'
import { useToggle } from '@corgi/hooks'

let size = ref('medium')
const clickHandle = () => {
  console.log('点击了')
  size.value = size.value == 'large' ? 'small' : 'large'
}

const themeConfig = {
  small: {
    fontSize: '20px'
  }
}

const btnTest = () => {alert(456)}

const [btnLoad, changeLoad] = useToggle(false)

watch(btnLoad, () => {
  if (btnLoad.value === true) {
    setTimeout(() => {
      changeLoad()
    }, 1500)
  }
})

const nextFn = () => {
  alert('okkk')
}

let val = ref(1)
const handleClick = () => {
  val.value = val.value + 1
}

const showVal = () => {
  console.log(val)
}

let height = 800
let mainHeight = ref(height + 'px')
let scroll = ref(null)
const loadMore = () => {
  height += 400
  mainHeight.value = height + 'px'
  scroll.value.update()
}

</script>


<style lang="less" scoped>
.box{
  color: #f3dede;
}

.test-scrollbar{
  width: 400px;
  height: 400px;
  .main{
    width: 800px;
    height: v-bind(mainHeight);
    background: linear-gradient(to bottom, #336696, #aa3377);
  }
}

</style>
