# Kentico Cloud Inline Resolver for Gatsby

### Let's resolve some inline elements with ease!

Resolving inline HTML elements with Kentico is made a lot easier by the `resolvedHtml` property returned by the GraphQL layer, however in order for us to use it effectively it still requires a fair bit of bootstrapped code in order to make this work. This component aims to abstract a bunch of logic away from the Gatsby layer. The code in this repo is 100% inspired by @rshackleton [awesome repo](https://github.com/rshackleton/rshackleton.co.uk). A lot of the bulk of the work was done by him on that repo. I've lifted the reusable pieces and reorganised it to make it easily installable into your own Gatsby projects. 

## Prerequesites

This package is built for use with Gatsby and Kentico Cloud specifically. As such it is unlikely to be of any use to any other projects. That being said, the logic behind the scenes may be useful for other rich text resolvers. 

### Installing
The package is available directly from npm:
```
npm install kenticocloudgatsbyresolver
```

## In use
This package contains a single component which takes in a few required fields in order to pass out your inline items to other components.
```js
import RichText from "kenticocloudgatsbyresolver";
<RichText 
  content={yourModel.resolvedHtml}
  contentItems={yourModel.linked_items}
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

#### contentItems (required)
As with the above, this is the second part of the puzzle. These give us our specific content items which will replace the placeholders in the `content` property.

#### customLinkedItemRenderer(required)
This is the 'doing' bit. This is a function which is called each time the rich text resolver internals encounter an inline content item. At this point we have two pieces of information provided back to us:
* type - the type codename of the current inline content item.
* linkedItem - the linkedItem of the current inline content item. 

This function could be written a number of ways but it lends itself to be a simple switch statement which returns a component for each different type. This could easily be abstracted away to an additional layer if you want to have a single source of truth to import into these rich text areas. 