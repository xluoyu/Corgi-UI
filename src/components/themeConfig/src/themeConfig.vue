
<script lang="ts">
import { defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'ThemeConfig',
  props: {
    theme: {
      type: Object,
      default: {}
    }
  },
  setup (props) {
    if (props.theme) {
      provide('theme', props.theme)
    }
    return {}
  },
  render () {
    return this.$slots.default && this.$slots.default()
  }
})
</script>

<style scoped>

</style>