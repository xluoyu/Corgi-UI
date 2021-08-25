import button from './cg-button';
export { default as CgButton } from './cg-button';
import menu from './cg-menu';
export { default as CgMenu } from './cg-menu';
import themeConfig from './cg-themeConfig';
export { default as CgThemeConfig } from './cg-themeConfig';
import space from './cg-space';
export { default as CgSpace } from './cg-space';
import icon from './cg-icon';
export { default as CgIcon } from './cg-icon';
import scrollbar from './cg-scrollbar';
export { default as CgScrollbar } from './cg-scrollbar';
export { useToggle } from './hooks/useToggle';

var version = "0.0.1";

const componentPrefix = "Cg";

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CgButton: button,
  CgMenu: menu,
  CgThemeConfig: themeConfig,
  CgSpace: space,
  CgIcon: icon,
  CgScrollbar: scrollbar
});

const componentArray = Object.keys(components).map((key) => components[key]);
const create = {
  version,
  componentPrefix,
  install(app) {
    componentArray.forEach((component) => {
      app.use(component);
    });
  }
};

export { create as default };
