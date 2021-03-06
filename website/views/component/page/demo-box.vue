<template>
  <div :id="id" ref="demoEl" :class="{'cg-show-demo':true}">
    <cg-card>
      <template #title>
        <slot name="title"></slot>
      </template>
      <div class="cg-card-content">
        <slot name="content"></slot>
        <slot name="demo"></slot>
      </div>
    </cg-card>
    <div class="cg-show-demo-code">
      <cg-scrollbar :height="codeHeight" x style="transition: height .3s;">
        <div class="cg-show-demo-code-content" v-html="code"></div>
      </cg-scrollbar>
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
import { useToggle } from '@corgi-box/hooks'
import { ref, watch } from 'vue'

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
  &:target{
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
  font-size: var(--fontSize-3);
}
.cg-show-demo-code{
  border-top: 1px dashed var(--border-color);
  .cg-show-demo-code-content{
    background-color: rgba(250, 250, 250, .6);
    background-image: url('@site/assets/paper.png');
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: var(--fontSize-3);
    box-sizing: border-box;
    line-height: 24px;
    letter-spacing: 2px;

    :deep(pre) {
      padding: 20px;
    }
  }
  .showcode-button{
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
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
