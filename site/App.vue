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
      <div @click="notifyMe">哈哈哈</div>
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
  if (route.name === 'home') {
    return {
      '--border-color': '#1ED5D8',
      '--color': '#fff',
    }
  }
  return {}
})

// document.addEventListener('DOMContentLoaded', function () {
//   if (Notification.permission !== 'granted')
//     Notification.requestPermission()
// })
console.log(window)
console.log(Notification)
console.log(Screen)
console.log(History)


function notifyMe() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.')
    return
  }

  if (Notification.permission !== 'granted')
    Notification.requestPermission()
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!",
    })

    notification.onclick = function () {
      window.open('http://stackoverflow.com/a/13328397/1269037')
    }

  }

}
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
