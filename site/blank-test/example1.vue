<template>
  <cg-theme-config :theme="themeConfig">
    <cg-button size="medium" type="info">测试</cg-button>
  </cg-theme-config>
  <cg-button size="large" type="info">测试</cg-button>
</template>

<script lang='ts' setup>
const themeConfig = {
  fontSizeH3: '28px',
  fontSizeH2: '38px',
  info: {
    bg: '#ff7904',
    color: 'red',
  },
  button: {
    round: '10px',
    medium: {
      padding: '20px',
    },
  },
}
</script>
