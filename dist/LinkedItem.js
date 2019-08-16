"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _get = _interopRequireDefault(require("lodash/get"));

var _TypeResolver = _interopRequireDefault(require("./resolver/TypeResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LinkedItem = function LinkedItem(_ref) {
  var linkedItem = _ref.linkedItem,
      resolveFunc = _ref.resolveFunc;
  var type = (0, _get["default"])(linkedItem, 'system.type');
  return _react["default"].createElement(_TypeResolver["default"], {
    resolveFunc: resolveFunc,
    linkedItem: linkedItem,
    type: type
  });
};

var _default = LinkedItem;
exports["default"] = _default;