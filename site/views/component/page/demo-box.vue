<template>
  <div class="cg-show-demo">
    <div class="cg-card">
      <div class="cg-card-header">
        <div class="cg-card-header-main">
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
          <cg-button type="primary" text @click.stop="copyCode">复制代码</cg-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToggle } from '@'
import { defineComponent } from 'vue'
import hljs from '../../../utils/hljs'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
  },
  setup (props) {
    const [showCode, changeShowCode] = useToggle(false)

    const copyCode = () => {
      console.log('copy')
      navigator.clipboard.writeText('526516484').then(() => {
        alert('拷贝成功')
      })
    }

    let sfcCode = hljs.highlight(props.code, {language: 'html'}).value
    sfcCode = `<pre>${sfcCode}</pre>`

    return {
      sfcCode,
      showCode,
      changeShowCode,
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
  &:hover{
    box-shadow: 0 0 6px rgba(0, 0, 0, .2);
  }
}
.cg-card{
  padding: 20px;
}
.cg-card-header-main{
  font-size: 18px;
}
.cg-card-content{
  font-size: 14px;
}
.cg-show-demo-code{
  border-top: 1px solid var(--boder-color);
  .cg-show-demo-code-content{
    background: #fafafa;
    padding: 0 20px;
    transition: all .6s;
    box-sizing: border-box;
    overflow-y: auto;
    font-size: 16px;
    line-height: 24px;
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