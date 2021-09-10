declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export interface Props {[name: string]: any;}
  export default component
}

declare module '*.md' {
  import { defineComponent } from 'vue'
  export default defineComponent
}
