<template>
  <div :class="{'cg-show-demo':true, 'active': activeComponentKey == id}" :id="id">
    <div class="cg-card">
      <div class="cg-card-header">
        <div class="cg-card-header-main cg-h2">
          <slot name="title"/>
        </div>
      </div>
      <div class="cg-card-content">
        <slot name="content"/>
        <slot name="demo" />
      </div>
    </div>
    <div class="cg-show-demo-code">
      <div class="cg-show-demo-code-content" :style="{maxHeight: showCode? '600px': '0px'}"  v-html="sfcCode">
      </div>
      <div class="showcode-button" @click="changeShowCode">
        <cg-button type="primary" text>{{showCode ? '隐藏' : '显示'}}代码</cg-button>
        <div class="right-botton flex-center">
          <cg-button type="primary" text @click.stop="copyCode" v-show="showCode">复制代码</cg-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToggle } from '@'
import { defineComponent } from 'vue'
import hljs from '../../../utils/hljs'
import { useCompoent } from '../hooks/compoent'

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true
    },
    id: String
  },
  setup (props) {
    const [showCode, changeShowCode] = useToggle(false)

    const copyCode = () => {
      navigator.clipboard.writeText(props.code).then(() => {
        alert('拷贝成功')
      })
    }

    let sfcCode = hljs.highlight(props.code, {language: 'html'}).value
    sfcCode = `<pre>${sfcCode}</pre>`

    const { activeComponentKey } = useCompoent()

    return {
      sfcCode,
      showCode,
      changeShowCode,
      activeComponentKey,
      copyCode
    }
  }
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
    background: url("site/assets/paper.png");
    transition: all .6s;
    box-sizing: border-box;
    overflow-y: auto;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 28px;
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
    position: relative;
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