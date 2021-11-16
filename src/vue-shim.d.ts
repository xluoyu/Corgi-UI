declare module '*.vue' {
  import { DefineComponent, ExtractPropTypes } from 'vue'
  interface HTMLAttributes {
    ang?: string
  }
  const component: DefineComponent<{}, {}, any>
  export type Props<T> = ExtractPropTypes<T>
  export default component
}

declare module '*.md' {
  import { defineComponent } from 'vue'
  export default defineComponent
}
