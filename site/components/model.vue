<template>
  <componentName name="xxx" :list="selectList" @click="handleClick">
    <template #head>
      <div>
        xxx
      </div>
    </template>
    <div>
    </div>
  </componentName>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectList = ref([1,2,3])

const handleClick = () => {
  console.log('还好')
}
</script>

