<template>

<md-component>
          <template #title>
            <div>基础</div>
          </template>
          <template #content>
            <p>展示一下几个按钮</p>
            <cg-button :onClick="clickHandle" size="tiny" style="margin-right: 10px;" type="error">tiny</cg-button>
            <cg-button :onClick="clickHandle" size="small" style="margin-right: 10px;" type="success">small</cg-button>
            <cg-button :onClick="clickHandle" size="medium" style="margin-right: 10px;" type="info" disabled>medium</cg-button>
            <cg-button :onClick="clickHandle" size="large" style="margin-right: 10px;" type="warning" >large</cg-button>
            <cg-button :onClick="clickHandle" size="medium" style="margin-right: 10px;" type="info" ghost dashed>ghost</cg-button>
            <cg-button :onClick="clickHandle" size="large" style="margin-right: 10px;">default</cg-button>
          </template>
          <template #code>
            <pre data-v-3cdb5513-s=""><code class="html hljs xml" data-v-3cdb5513-s=""><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span>&gt;</span>默认按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">plain</span>&gt;</span>朴素按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">plain</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">plain</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">plain</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span> <span class="hljs-attr">plain</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">plain</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">round</span>&gt;</span>圆角按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">round</span>&gt;</span>主要按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">round</span>&gt;</span>成功按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">round</span>&gt;</span>信息按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span> <span class="hljs-attr">round</span>&gt;</span>警告按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">round</span>&gt;</span>危险按钮<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-search"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-edit"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-check"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"info"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-message"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-star-off"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-delete"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

              </code>
        </pre>
    </template>
  </md-component>
</template>