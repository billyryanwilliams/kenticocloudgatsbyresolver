"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _RichTextResolver = _interopRequireDefault(require("./RichTextResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RichText = function RichText(_ref) {
  var content = _ref.content,
      images = _ref.images,
      links = _ref.links,
      contentItems = _ref.contentItems,
      customLinkedItemRenderer = _ref.customLinkedItemRenderer,
      customLinkRenderer = _ref.customLinkRenderer,
      customImageRenderer = _ref.customImageRenderer;

  if (!content || !content.length) {
    return null;
  }

  if (customLinkedItemRenderer === undefined) {
    customLinkedItemRenderer = function customLinkedItemRenderer() {
      return "Please add in a custom renderer to get inline content items!";
    };
  }

  if (customLinkRenderer === undefined) {
    customLinkRenderer = function customLinkRenderer(_ref2) {
      var urlSlug = _ref2.urlSlug,
          linkId = _ref2.linkId;

      if (urlSlug === undefined) {
        urlSlug = '#';
      }

      if (linkId === undefined) {
        linkId = '#';
      }

      return _react["default"].createElement(_gatsby.Link, {
        key: linkId,
        to: urlSlug
      });
    };
  }

  if (customImageRenderer === undefined) {
    customImageRenderer = function customImageRenderer(_ref3) {
      var id = _ref3.id,
          url = _ref3.url,
          description = _ref3.description;
      return _react["default"].createElement("picture", {
        "class": "k-inline-image"
      }, _react["default"].createElement("source", {
        srcset: "".concat(url, "?w=600&auto=format 1x, ").concat(url, "?w=1200&auto=format 2x"),
        media: "(min-width: 600px)"
      }), _react["default"].createElement("source", {
        srcset: "".concat(url, "?w=400&auto=format 1x, ").concat(url, "?w=800&auto=format 2x"),
        media: "(min-width: 400px)"
      }), _react["default"].createElement("source", {
        srcset: "".concat(url, "?w=300&auto=format 1x, ").concat(url, "?w=600&auto=format 2x"),
        media: "(min-width: 300px)"
      }), _react["default"].createElement("img", {
        alt: description,
        src: url
      }));
    };
  }

  var kenticoRichTextResolver = new _RichTextResolver["default"]({
    rawHtml: content,
    linkedImages: images,
    linkedLinks: links,
    linkedItems: contentItems,
    customLinkedItemRenderer: customLinkedItemRenderer,
    customLinkRenderer: customLinkRenderer,
    customImageRenderer: customImageRenderer
  });
  var children = kenticoRichTextResolver.parseHTML();
  return _react["default"].createElement(_react["default"].Fragment, null, children);
};

RichText.propTypes = {
  content: _propTypes["default"].string.isRequired,
  images: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  links: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  contentItems: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  customLinkedItemRenderer: _propTypes["default"].func,
  customLinkRenderer: _propTypes["default"].func,
  customImageRenderer: _propTypes["default"].func
};
var _default = RichText;
exports["default"] = _default;