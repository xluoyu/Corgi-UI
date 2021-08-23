import cssvar from '../../_style/cssvar';
const buttonVar = {
    theme: cssvar.default,
    color: '#fff',
    round: '3px',
    tiny: {
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
        height: '34px',
        fontSize: cssvar.fontSizeH3,
        circle: '16px',
        padding: '0 14px',
    },
    large: {
        height: '40px',
        fontSize: cssvar.fontSizeH2,
        circle: '20px',
        padding: '0 18px',
    }
};
export default Object.assign(cssvar, buttonVar);
