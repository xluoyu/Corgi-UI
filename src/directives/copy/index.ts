export const CgCopy = {
  install: app => {
    app.config.globalProperties.$copy = content => {
      return navigator.clipboard.writeText(content)
    }
    app.directive('copy', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          navigator.clipboard.writeText(el.innerText).then(binding.value)
        })
      },
    })
  },
}
