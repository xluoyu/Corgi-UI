import { toUpperCase } from '@corgi-box/utils'

export default (componentName: String, attrs, slots, events) => {
  let template = `<template>
  <${componentName}`
  let script = `
<script lang="ts" setup>
import { ref } from 'vue'
`
  let slot = ``

  attrs.forEach(item => {
    if (['select', 'text'].includes(item.type)) {
      template += `\n    ${item.key}="${item.value}"`
    } else if (item.type === 'switch') {
      template += `\n    :${item.key}="${item.value}"`
    } else if (item.type === 'code') {
      const curAttr = componentName + toUpperCase(item.key)
      template += `\n    :${item.key}="${curAttr}"`
      script += `\nconst ${curAttr} = ref(${item.value})`
    }
  })
  events.forEach(item => {
    const curEvent = componentName + toUpperCase(item.key)
    template += `\n    @${item.key}="${curEvent}"`
    script += `\nconst ${curEvent} = ${item.value}`
  })

  slots.forEach(item => {
    if (item.key === 'default') {
      slot += `
    ${item.value}`
    } else {
      slot += `
    <template #${item.key}>
${item.value.split('\n').map(e => '      ' + e).join('\n')}
    </template>`
    }
  })

  template += `
  >`

  template += `${slot}
  </${componentName}>
</template>
`
  script += `
</script>
`
  return template + script
}
