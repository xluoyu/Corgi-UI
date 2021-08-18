<template>
  <div style="margin: 20px">
    <cg-theme-config :theme="themeConfig">
      <cg-button :onClick="clickHandle" size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
      <cg-button :onClick="clickHandle" size="small" style="margin-right: 10px;" type="success" ghost>small</cg-button>
      <cg-button :onClick="clickHandle" size="medium" style="margin-right: 10px;" type="info" color="#fff">medium</cg-button>
      <cg-button :onClick="clickHandle" size="large" style="margin-right: 10px;" type="warning">large</cg-button>
      <cg-button :onClick="clickHandle" size="medium" style="margin-right: 10px;">default</cg-button>
    </cg-theme-config>

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

    watchEffect(() => {

    })

    return {
      size,
      themeConfig,
      clickHandle
    }
  }
})
</script>

<style scoped>
.box{
  color: #f3dede;
}
</style>