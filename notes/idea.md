## 关于组件样式的变量抽离

参照`Naive UI`的`themeConfig`，暴露出`themeConfig`组件，可传入自定义的`css变量`（按照提供的变量表），在使用的组件获取变量时以inject的方式查看上级是否又`themeConfig`组件并提供了相应的`css变量`，如有则用上级的，没有则用预定义的。



