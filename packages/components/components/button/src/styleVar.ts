const buttonVar = cssvar => {
  return {
    theme: cssvar.default,
    round: '3px',
    mini: {
      height: '22px',
      fontSize: cssvar.fontSizeH5,
      circle: '10px',
      padding: '0 6px',
    },
    small: {
      height: '28px',
      fontSize: cssvar.fontSizeH4,
      circle: '14px',
      padding: '0 10px',
    },
    medium: {
      height: '32px',
      fontSize: cssvar.fontSizeH4,
      circle: '16px',
      padding: '0 12px',
    },
    large: {
      height: '36px',
      fontSize: cssvar.fontSizeH2,
      circle: '20px',
      padding: '0 14px',
    },
  }
}


export default buttonVar
