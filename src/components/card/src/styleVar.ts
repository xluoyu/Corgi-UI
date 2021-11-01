const CardVar = cssVar => {
  return {
    large: {
      padding: '26px 24px',
      titleFontSize: cssVar.fontSizeH1,
    },
    medium: {
      padding: '20px',
      titleFontSize: cssVar.fontSizeH2,
    },
    mini: {
      padding: '14px 16px',
      titleFontSize: cssVar.fontSizeH3,
    },
  }
}

export default CardVar
