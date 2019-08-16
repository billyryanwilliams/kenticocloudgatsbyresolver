import React from 'react';
import get from 'lodash/get';
import parseHTML from 'html-react-parser';

import LinkedItem from './LinkedItem';

class KenticoRichTextResolver {
  constructor({rawHtml, linkedImages, linkedLinks, linkedItems, customLinkedItemRenderer, customLinkRenderer, customImageRenderer}) {
    this.linkedImages = linkedImages;
    this.linkedLinks = linkedLinks;
    this.linkedItems = linkedItems;
    this.customLinkedItemRenderer = customLinkedItemRenderer;
    this.customLinkRenderer = customLinkRenderer;
    this.customImageRenderer = customImageRenderer;
    this.html = rawHtml.replace(/(\n|\r)+/, '');
  }
  /** Check if DOM node is a Kentico Cloud inline asset. */
  isAsset(domNode) {
    return (
      domNode.name === 'figure' &&
      domNode.attribs &&
      domNode.attribs['data-asset-id']
    );
  }
  /** Check if DOM node is a Kentico Cloud inline link. */
  isLink(domNode) {
    return (
      domNode.name === 'a' && domNode.attribs && domNode.attribs['data-item-id']
    );
  }
  /** Check if DOM node is a Kentico Cloud inline content item. */
  isLinkedItem(domNode) {
    return (
      domNode.name === 'p' &&
      domNode.attribs &&
      domNode.attribs.type === 'application/kenticocloud'
    );
  }
  /** Get ID for Kentico Cloud inline asset from DOM node. */
  getAssetId(domNode) {
    return get(domNode, 'attribs["data-asset-id"]') || null;
  }
  /** Get code name for Kentico Cloud inline content item from DOM node. */
  getCodeName(domNode) {
    return get(domNode, 'attribs["data-codename"]') || null;
  }
  /** Get data for Kentico Cloud inline link. */
  getLink(id, links) {
    return links.find(link => link.linkId === id);
  }
  /** Get content for Kentico Cloud inline link from DOM node. */
  getLinkContent(domNode) {
    return get(domNode, 'children[0].data') || null;
  }
  /** Get data for Kentico Cloud inline content item. */
  getLinkedItem(codename, linkedItems) {
    return linkedItems.find(item => item.system.codename === codename);
  }
  /** Get ID for Kentico Cloud inline link from DOM node. */
  getLinkId(domNode) {
    return get(domNode, 'attribs["data-item-id"]') || null;
  }
  parseHTML() {
    return parseHTML(this.html, {
      replace: domNode => this.replaceNode(domNode, this.linkedImages, this.linkedLinks, this.linkedItems),
    })
  }
  replaceNode(domNode, images, links, linkedItems) {
    // Replace inline assets.
    if (this.isAsset(domNode)) {
      const id = this.getAssetId(domNode);
      const image = this.getAsset(id, images);
      return this.customImageRenderer({ id: id, url: image.url});
    }
    // Replace inline links.
    if (this.isLink(domNode)) {
      // const content = this.getLinkContent(domNode);
      const id = this.getLinkId(domNode);
      const link = this.getLink(id, links);
      return this.customLinkRenderer({ urlSlug: link, linkId: id });
    }
    // Replace inline linked items.
    if (this.isLinkedItem(domNode)) {
      const codename = this.getCodeName(domNode);
      const linkedItem = this.getLinkedItem(codename, linkedItems);
      return <LinkedItem resolveFunc={this.customLinkedItemRenderer} linkedItem = {linkedItem}/>;
    }
  }
}

export default KenticoRichTextResolver;