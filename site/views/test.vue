<template>
  <div style="margin: 20px">
    <cg-theme-config :theme="themeConfig">
      <cg-button size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
      <cg-button size="small" style="margin-right: 10px;" type="success">small</cg-button>
      <cg-button size="medium" style="margin-right: 10px;" type="info" disabled>medium</cg-button>
      <cg-button size="large" style="margin-right: 10px;" type="warning" >large</cg-button>
      <cg-button size="medium" style="margin-right: 10px;" type="info" ghost dashed>ghost</cg-button>
      <cg-button size="large" style="margin-right: 10px;">default</cg-button>
      
    </cg-theme-config>

  <md-component>
    <template #demo>
      <cg-button @click="handleClick" size="large" style="margin-right: 10px;" type="warning" text>default</cg-button>
      <div>{{val}}</div>
    </template>
  </md-component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';

export default defineComponent({
  setup () {
    const size = ref('medium')
    const clickHandle = () => {
      console.log('点击了')
      size.value = size.value == 'large' ? 'small' : 'large'
    }

    const themeConfig = {
      // small: {
      //   fontSize: '20px'
      // }
    }

    const val = ref(1)
    const handleClick = () => {
      val.value = val.value + 1
    }

    const showVal = () => {
      console.log(val.value)
    }

    return {
      size,
      themeConfig,
      clickHandle,
      showVal,
      handleClick,
      val
    }
  }
})
</script>

<style scoped>
.box{
  color: #f3dede;
}
</style>