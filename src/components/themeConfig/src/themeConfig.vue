
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
    provide('theme', props.theme)
  },
  render () {
    return this.$slots.default && this.$slots.default()
  },
})
</script>
