<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  },
  render () {
    const children = this.$slots.default && this.$slots.default()
    const childrens = [[], []]
    children?.forEach((e, index) => {
      if (index % 2 === 0) {
        childrens[0].push(e)
      } else {
        childrens[1].push(e)
      }
    })
    console.log(childrens)
    return (
      <div class="grid">
        <div>
          {
            childrens[0].map(child => child)
          }
        </div>
        <div>
          {
            childrens[1].map(child => child)
          }
        </div>
      </div>
    )
  }
})
</script>

<style scoped>

</style>