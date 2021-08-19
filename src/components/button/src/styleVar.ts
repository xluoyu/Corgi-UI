import cssvar from '../../_style/cssvar'

const buttonVar = {
  theme: cssvar.primary,
  color: '#fff',
  round: '3px',
  tiny: {
    height: '22px',
    fontSize: '12px',
    circle: '10px',
    padding: '0 6px',
  },
  small: {
    height: '28px',
    fontSize: '14px',
    circle: '14px',
    padding: '0 10px',

  },
  medium: {
    height: '34px',
    fontSize: '16px',
    circle: '16px',
    padding: '0 14px',

  },
  large: {
    height: '40px',
    fontSize: '18px',
    circle: '20px',
    padding: '0 18px',
  }
}

export default Object.assign(cssvar, buttonVar)