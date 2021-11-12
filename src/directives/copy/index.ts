export const CgCopy = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.innerText).then(binding.value)
    })
  },
}
