"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ResolvedContent = function ResolvedContent(_ref) {
  var linkedItem = _ref.linkedItem,
      type = _ref.type,
      resolveFunc = _ref.resolveFunc;
  return resolveFunc({
    linkedItem: linkedItem,
    type: type
  });
};

var _default = ResolvedContent;
exports["default"] = _default;