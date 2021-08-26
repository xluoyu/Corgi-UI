'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var button = require('./cg-button');
var menu = require('./cg-menu');
var themeConfig = require('./cg-themeConfig');
var space = require('./cg-space');
var icon = require('./cg-icon');
var scrollbar = require('./cg-scrollbar');
var useToggle = require('./hooks/useToggle');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var button__default = /*#__PURE__*/_interopDefaultLegacy(button);
var menu__default = /*#__PURE__*/_interopDefaultLegacy(menu);
var themeConfig__default = /*#__PURE__*/_interopDefaultLegacy(themeConfig);
var space__default = /*#__PURE__*/_interopDefaultLegacy(space);
var icon__default = /*#__PURE__*/_interopDefaultLegacy(icon);
var scrollbar__default = /*#__PURE__*/_interopDefaultLegacy(scrollbar);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CgButton: button__default['default'],
  CgMenu: menu__default['default'],
  CgThemeConfig: themeConfig__default['default'],
  CgSpace: space__default['default'],
  CgIcon: icon__default['default'],
  CgScrollbar: scrollbar__default['default']
});

var version = "0.0.1";

const componentPrefix = "Cg";

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

Object.defineProperty(exports, 'CgButton', {
  enumerable: true,
  get: function () {
    return button__default['default'];
  }
});
Object.defineProperty(exports, 'CgMenu', {
  enumerable: true,
  get: function () {
    return menu__default['default'];
  }
});
Object.defineProperty(exports, 'CgThemeConfig', {
  enumerable: true,
  get: function () {
    return themeConfig__default['default'];
  }
});
Object.defineProperty(exports, 'CgSpace', {
  enumerable: true,
  get: function () {
    return space__default['default'];
  }
});
Object.defineProperty(exports, 'CgIcon', {
  enumerable: true,
  get: function () {
    return icon__default['default'];
  }
});
Object.defineProperty(exports, 'CgScrollbar', {
  enumerable: true,
  get: function () {
    return scrollbar__default['default'];
  }
});
Object.defineProperty(exports, 'useToggle', {
  enumerable: true,
  get: function () {
    return useToggle.useToggle;
  }
});
exports['default'] = create;
