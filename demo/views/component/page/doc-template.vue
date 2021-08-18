<template>
  <div class="doc">
    <div class="content">
      <h1 class="cg-h1">按钮 Button</h1>
      <p class="cg-p">用来触发一些操作</p>
      <h2 class="cg-h2">演示</h2>
      <div class="grid">
        <demo-template />
      </div>
      <h2 class="cg-h2">Props</h2>
      <h3 class="cg-h3">Button Props</h3>
      <div class="cg-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>color</td>
              <td>
                <code class="cg-text cg-text--code">string</code>
              </td>
              <td>
                <code class="cg-text cg-text--code">undefind</code>
              </td>
              <td>
                按钮颜色(支持形如<code>#fff</code>, <code>#ffffff</code>的颜色)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="doc-nav"></div>
  </div>
</template>

<script>
import demoTemplate from "./demo-template.vue"
export default {
  components: {
    demoTemplate
  }
  
}
</script>

<style lang="less" scoped>
.cg-h1{
  font-size: 30px;
  font-weight: 500;
  margin: 20px 0;
}
.cg-h2{
  font-size: 24px;
  font-weight: 500;
  margin: 16px 0;
}
.cg-h3{
  font-size: 18px;
  font-weight: 500;
  margin: 12px 0;
}
.cg-p{
  font-size: 14px;
  margin: 6px 0;
}
</style>