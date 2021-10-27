const SwitchVar = cssVar => {
  return {
    activeColor: cssVar.success.bg,
    inactiveColor: cssVar.default.bg,
    large: {
      height: '26px',
      width: '48px',
    },
    medium: {
      height: '22px',
      width: '40px',
    },
    mini: {
      height: '18px',
      width: '32px',
    },
  }
}

export default SwitchVar
