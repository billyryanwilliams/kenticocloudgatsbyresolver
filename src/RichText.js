import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import KenticoRichTextResolver from './RichTextResolver';

const RichText = ({ content, images, links, contentItems, customLinkedItemRenderer, customLinkRenderer, customImageRenderer }) => {
  if (!content || !content.length) {
    return null;
  }
  if(customLinkedItemRenderer === undefined) {
    customLinkedItemRenderer = () => {
      return "Please add in a custom renderer to get inline content items!";
    }
  }
  if(customLinkRenderer === undefined) {
    customLinkRenderer = ({urlSlug, linkId}) => {
      if(urlSlug === undefined) {
        urlSlug = '#';
      }
      if(linkId === undefined) {
        linkId = '#';
      }
      return <Link key={linkId} to={urlSlug}></Link>;
    }
  }
  if(customImageRenderer === undefined) {
    customImageRenderer = ({id, url, description}) => {
      return <picture class="k-inline-image">
        <source 
          srcset={`${url}?w=600&auto=format 1x, ${url}?w=1200&auto=format 2x`}
          media="(min-width: 600px)"
        />
        <source 
          srcset={`${url}?w=400&auto=format 1x, ${url}?w=800&auto=format 2x`}
          media="(min-width: 400px)"
        />
        <source 
          srcset={`${url}?w=300&auto=format 1x, ${url}?w=600&auto=format 2x`}
          media="(min-width: 300px)"
        />
        <img alt={description} src={url} />
      </picture>
    }
  }
  const kenticoRichTextResolver = new KenticoRichTextResolver({ 
      rawHtml: content,
      linkedImages: images, 
      linkedLinks: links, 
      linkedItems: contentItems,
      customLinkedItemRenderer: customLinkedItemRenderer,
      customLinkRenderer: customLinkRenderer,
      customImageRenderer: customImageRenderer
    }
  );
  const children = kenticoRichTextResolver.parseHTML();
  return <>{children}</>;
}

RichText.propTypes = {
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  contentItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  customLinkedItemRenderer: PropTypes.func,
  customLinkRenderer: PropTypes.func,
  customImageRenderer: PropTypes.func
};
export default RichText;