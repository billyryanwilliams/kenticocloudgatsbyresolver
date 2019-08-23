"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _get = _interopRequireDefault(require("lodash/get"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

var _LinkedItem = _interopRequireDefault(require("./LinkedItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KenticoRichTextResolver =
/*#__PURE__*/
function () {
  function KenticoRichTextResolver(_ref) {
    var rawHtml = _ref.rawHtml,
        linkedImages = _ref.linkedImages,
        linkedLinks = _ref.linkedLinks,
        linkedItems = _ref.linkedItems,
        customLinkedItemRenderer = _ref.customLinkedItemRenderer,
        customLinkRenderer = _ref.customLinkRenderer,
        customImageRenderer = _ref.customImageRenderer;

    _classCallCheck(this, KenticoRichTextResolver);

    this.linkedImages = linkedImages;
    this.linkedLinks = linkedLinks;
    this.linkedItems = linkedItems;
    this.customLinkedItemRenderer = customLinkedItemRenderer;
    this.customLinkRenderer = customLinkRenderer;
    this.customImageRenderer = customImageRenderer;
    this.html = rawHtml.replace(/(\n|\r)+/, '');
  }
  /** Check if DOM node is a Kentico Cloud inline asset. */


  _createClass(KenticoRichTextResolver, [{
    key: "isAsset",
    value: function isAsset(domNode) {
      return domNode.name === 'figure' && domNode.attribs && domNode.attribs['data-asset-id'];
    }
    /** Check if DOM node is a Kentico Cloud inline link. */

  }, {
    key: "isLink",
    value: function isLink(domNode) {
      return domNode.name === 'a' && domNode.attribs && domNode.attribs['data-item-id'];
    }
    /** Check if DOM node is a Kentico Cloud inline content item. */

  }, {
    key: "isLinkedItem",
    value: function isLinkedItem(domNode) {
      return domNode.name === 'p' && domNode.attribs && domNode.attribs.type === 'application/kenticocloud';
    }
    /** Get ID for Kentico Cloud inline asset from DOM node. */

  }, {
    key: "getAssetId",
    value: function getAssetId(domNode) {
      return (0, _get["default"])(domNode, 'attribs["data-asset-id"]') || null;
    }
  }, {
    key: "getAsset",
    value: function getAsset(id, assets) {
      return assets.find(function (asset) {
        return asset.imageId === id;
      });
    }
    /** Get code name for Kentico Cloud inline content item from DOM node. */

  }, {
    key: "getCodeName",
    value: function getCodeName(domNode) {
      return (0, _get["default"])(domNode, 'attribs["data-codename"]') || null;
    }
    /** Get data for Kentico Cloud inline link. */

  }, {
    key: "getLink",
    value: function getLink(id, links) {
      return links.find(function (link) {
        return link.linkId === id;
      });
    }
    /** Get content for Kentico Cloud inline link from DOM node. */

  }, {
    key: "getLinkContent",
    value: function getLinkContent(domNode) {
      return (0, _get["default"])(domNode, 'children[0].data') || null;
    }
    /** Get data for Kentico Cloud inline content item. */

  }, {
    key: "getLinkedItem",
    value: function getLinkedItem(codename, linkedItems) {
      return linkedItems.find(function (item) {
        return item.system.codename === codename;
      });
    }
    /** Get ID for Kentico Cloud inline link from DOM node. */

  }, {
    key: "getLinkId",
    value: function getLinkId(domNode) {
      return (0, _get["default"])(domNode, 'attribs["data-item-id"]') || null;
    }
  }, {
    key: "parseHTML",
    value: function parseHTML() {
      var _this = this;

      return (0, _htmlReactParser["default"])(this.html, {
        replace: function replace(domNode) {
          return _this.replaceNode(domNode, _this.linkedImages, _this.linkedLinks, _this.linkedItems);
        }
      });
    }
  }, {
    key: "replaceNode",
    value: function replaceNode(domNode, images, links, linkedItems) {
      // Replace inline assets.
      if (this.isAsset(domNode)) {
        var id = this.getAssetId(domNode);
        var image = this.getAsset(id, images);
        return this.customImageRenderer({
          id: id,
          url: image.url,
          description: image.description
        });
      } // Replace inline links.


      if (this.isLink(domNode)) {
        // const content = this.getLinkContent(domNode);
        var _id = this.getLinkId(domNode);

        var link = this.getLink(_id, links);
        return this.customLinkRenderer({
          urlSlug: link,
          linkId: _id
        });
      } // Replace inline linked items.


      if (this.isLinkedItem(domNode)) {
        var codename = this.getCodeName(domNode);
        var linkedItem = this.getLinkedItem(codename, linkedItems);
        return _react["default"].createElement(_LinkedItem["default"], {
          resolveFunc: this.customLinkedItemRenderer,
          linkedItem: linkedItem
        });
      }
    }
  }]);

  return KenticoRichTextResolver;
}();

var _default = KenticoRichTextResolver;
exports["default"] = _default;