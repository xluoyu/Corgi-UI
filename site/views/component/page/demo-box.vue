<template>
  <div :id="id" ref="demoEl" :class="{'cg-show-demo':true, 'active': activeComponentKey == id}">
    <div class="cg-card">
      <div class="cg-card-header">
        <div class="cg-card-header-main cg-h2">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="cg-card-content">
        <slot name="content"></slot>
        <slot name="demo"></slot>
      </div>
    </div>
    <div class="cg-show-demo-code">
      <div class="cg-show-demo-code-content" :style="{height: codeHeight}" v-html="sfcCode"></div>
      <div class="showcode-button" @click="changeShowCode">
        <cg-button type="primary" text>{{ showCode ? '隐藏' : '显示' }}代码</cg-button>
        <div class="right-botton flex-center">
          <cg-button
            v-show="showCode"
            type="primary"
            text
            @click.stop="copyCode"
          >
            复制代码
          </cg-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToggle } from '@hooks/useToggle'
import { ref, watch } from 'vue'
import hljs from '../../../utils/hljs'
import { useCompoent } from '../hooks/compoent'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  id: String,
})

const demoEl = ref(null)
const [showCode, changeShowCode] = useToggle(false)

const copyCode = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    alert('拷贝成功')
  })
}

let sfcCode = hljs.highlight(props.code, { language: 'html' }).value
sfcCode = `<pre class='code'>${sfcCode}</pre>`

const { activeComponentKey } = useCompoent()
const getCodeHeight = () => {
  return demoEl.value.querySelector('.cg-show-demo-code-content pre').clientHeight
}
const codeHeight = ref('0px')
watch(showCode, () => {
  codeHeight.value = showCode.value ? getCodeHeight() + 'px' : '0px'
})
</script>

<style lang="less" scoped>
.cg-show-demo{
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: all .3s;
  margin-bottom: 20px;
  background: #fff;
  &.active{
    border: 1px solid var(--theme);
  }
  &:hover{
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
  }
}
.cg-card{
  padding: 20px;
}
.cg-card-content{
  font-size: 14px;
}
.cg-show-demo-code{
  border-top: 1px dashed var(--border-color);
  .cg-show-demo-code-content{
    background-color: rgba(250, 250, 250, .6);
    background-image: url('@site/assets/paper.png');
    transition: all .4s;
    box-sizing: border-box;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 2px;
    :deep(pre) {
      padding: 20px;
    }
  }
  .showcode-button{
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    transition: all .3s;
    position: sticky;
    bottom: 0;
    background: #fff;
    &:hover{
      color: var(--theme);
      background: var(--theme-hover);
    }
    .right-botton {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
    }
  }
}
</style>
