# Kentico Cloud Inline Resolver for Gatsby

#### Please note that this is currently a work in progress. If you have any ideas or changes that you want making then please open a ticket to discuss!

### Let's resolve some inline elements with Kentico Cloud!

Resolving inline content elements, images, and links with Kentico is made a lot easier by the `resolvedHtml` property returned by the GraphQL layer, however in order for us to use it effectively it still requires a fair bit of bootstrapped code in order to make this work. 

This component aims to abstract a bunch of logic away from the Gatsby layer. The code in this repo is 100% inspired by @rshackleton [awesome repo](https://github.com/rshackleton/rshackleton.co.uk). A lot of the bulk of the bootstrapping work was done by him on that repo, so go give him a star on his project. I've lifted the reusable pieces and reorganised it to make it easily installable into your own Gatsby projects. 

## Prerequisites

This package is built for use with Gatsby and Kentico Cloud specifically. As such it is unlikely to be of any use to any other projects. That being said, the logic behind the scenes may be useful for other rich text resolvers. 

Current tested build is against the following packages:
* `"gatsby": "2.13.13"`
* `"react": "^16.8.6",`
* `"gatsby-source-kentico-cloud": "^3.1.0",`

### Installing
The package is available directly from npm:

```
npm install kenticocloudgatsbyresolver --save
```

## Usage
This package contains a single `<RichText/>` component which takes in a few required fields in order to pass out your inline content items, images and links to other components.

```js
import RichText from "kenticocloudgatsbyresolver";

// yourModel will be the data model fetched back from the Kentico Sourcing plugin.

<RichText 
  content={richTextContent.resolvedHtml}
  contentItems={richTextContent.linked_items}
  images={richTextContent.images}
  links={[]}
  customLinkedItemRenderer={
    function({type, linkedItem}){
      switch (type) {
        case 'snippet': {
          return <CodeBlock linkedItem={linkedItem} />;
        }
        default:
          return "Unsupported type";
      }
    }
  }
/>
```

### Component properties

#### content (Required)
This is the resolved html field of your rich text content type. You need to ensure you request this back in your Gatsby GraphQL query.

#### images (Required)
This is the field of your image IDs. You need to ensure you request this back in your Gatsby GraphQL query.

#### contentItems (required)
This is the field of your linked inline content item references. This gives us our specific content items which will replace the placeholders in the `content` property. 

#### customLinkedItemRenderer(required)
A function which is called each time the rich text resolver internals encounter an inline content item. At this point we have two pieces of information provided back to us:
* `type`(string) - the codename of the current inline content item.
* `linkedItem`(object) - the linkedItem of the current inline content item. 

This function could be written a number of ways but it lends itself to be a simple switch statement which returns a component for each different type. This could easily be abstracted away to an additional layer if you want to have a single source of truth to import into these rich text areas. 

```js
function({type, linkedItem}){
  switch (type) {
    case 'snippet': {
      return <CodeBlock linkedItem={linkedItem} />;
    }
    default:
      return "Unsupported type";
  }
}
```

#### customImageRenderer
This is a non required function which is called each time the rich text resolver internals encounter an inline image. At this point we have two pieces of information provided back to us. There is a default function provided, which can be overridden by providing this property to the component. 

The function is passed the following arguments:

* `id`(guid) - the ID of the current image.
* `url`(string) - the Url of the current images from Kentico Cloud. 
* `description`(string) - the description of the current images for alt text usage.

#### Default customImageRenderer
```js
function({id, url, description}) {
  return <picture className="k-inline-image">
    <source 
      srcSet={`${url}?w=600&auto=format 1x, ${url}?w=1200&auto=format 2x`}
      media="(min-width: 600px)"
    />
    <source 
      srcSet={`${url}?w=400&auto=format 1x, ${url}?w=800&auto=format 2x`}
      media="(min-width: 400px)"
    />
    <source 
      srcSet={`${url}?w=300&auto=format 1x, ${url}?w=600&auto=format 2x`}
      media="(min-width: 300px)"
    />
    <img alt={description} src={url} />
  </picture>
}
```

### customLinkRenderer (Coming Soon!)