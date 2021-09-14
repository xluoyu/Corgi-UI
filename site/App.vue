<template>
  <cg-loadingbar>
    <div class="layout">
      <div v-if="route.name == 'home'" class="corgi-bg">
        <video
          src="https://vd4.bdstatic.com/mda-mhvcefp0804vmrat/1080p/cae_h264/1630313434720525820/mda-mhvcefp0804vmrat.mp4"
          loop
          muted
          class="video-background"
          poster="./assets/poster.jpg"
          autoplay
        ></video>
      </div>
      <div :style="siteTheme">
        <site-header />
        <router-view />
      </div>
    </div>
  </cg-loadingbar>
</template>

<script lang='ts' setup>
import SiteHeader from './components/site-header.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const siteTheme = computed(() => {
  return {
    '--border-color': route.name === 'home' ? '#1ED5D8' : '#eee',
    '--color': route.name === 'home' ? '#fff' : '#333',
    color: 'var(--color)',
  }
})
</script>

<style lang="less" scoped>
.corgi-bg{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  .video-background{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
  }
}
</style>
