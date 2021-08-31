
<script lang="ts">
import { defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'CgThemeConfig',
  props: {
    theme: {
      type:[Object, null],
      default: null,
    },
  },
  setup (props) {
    if (props.theme) {
      provide('theme', props.theme)
    }
    return {}
  },
  render () {
    return this.$slots.default && this.$slots.default()
  },
})
</script>

<style scoped>

</style>
