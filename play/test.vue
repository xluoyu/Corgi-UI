<template>
  <div class="form">
    <input type="text" v-model="name">
    <div v-for="item in options" :key="item.label" class="form-item">
      <label>{{ item.label }}</label>
      <input v-if="item.type === 'text'" v-model="item.value">
      <select v-if="item.type === 'select'" v-model="item.value">
        <option v-for="op in item.options" :key="op" :value="op">{{ op }}</option>
      </select>
      <cg-switch v-if="item.type === 'switch'" v-model="item.value" />
    </div>
    <cg-button @click="submit">提交</cg-button>
  </div>
</template>

<script>
export default {
  props: {
    options: Object,
    name: String
  },
  methods: {
    submit() {
      console.log(this.options)
      console.log(this.name)
      this.$emit('submit')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>