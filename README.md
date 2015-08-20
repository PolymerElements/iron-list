iron-list
========================

`iron-list` displays a virtual, *'infinite'* list. The template inside
the iron-list element represents the DOM to create for each list item.
The `items` property specifies an array of list item data.

For performance reasons, not every item in the list is rendered at once;
instead a small subset of actual template elements *(enough to fill the viewport)*
are rendered and reused as the user scrolls. As such, it is important that all
state of the list template be bound to the model driving it, since the view may
be reused with a new model at any time. Particularly, any state that may change
as the result of a user interaction with the list item must be bound to the model
to avoid view state inconsistency.

__Important:__ `iron-list` must ether be explicitly sized, or delegate scrolling to an
explicitly sized parent. By "explicitly sized", we mean it either has an explicit
CSS `height` property set via a class or inline style, or else is sized by other
layout means (e.g. the `flex` or `fit` classes).

### Template model

List item templates should bind to template models of the following structure:

```js
{
  index: 0,     // data index for this item
  item: {       // user data corresponding to items[index]
    /* user item data  */
  }
}
```

Alternatively, you can change the property name used as data index by changing the
`indexAs` property. The `as` property defines the name of the variable to add to the binding
scope for the array.

For example, given the following `data` array:

##### data.json

```js
[
  {"name": "Bob"},
  {"name": "Tim"},
  {"name": "Mike"}
]
```

The following code would render the list (note the name and checked properties are
bound from the model object provided to the template scope):

```html
<template is="dom-bind">
  <iron-ajax url="data.json" last-response="{{data}}" auto></iron-ajax>
  <iron-list items="[[data]]" as="item">
    <template>
      <div>
        Name: <span>[[item.name]]</span>
      </div>
    </template>
  </iron-list>
</template>
```

### Styling

To customize the container for the items:

```css
iron-list {
 --iron-list-items-container: {
    // custom CSS
  };
}
```

### Resizing

`iron-list` lays out the items when it recives a notification via the `resize` event.
This event is fired by any element that implements `IronResizableBehavior`.

By default, elements such as `iron-pages`, `paper-tabs` or `paper-dialog` will trigger
this event automatically. If you hide the list manually (e.g. you use `display: none`)
you might want to implement `IronResizableBehavior` or fire this event manually right 
after the list became visible again. e.g.

```js
document.querySelector('iron-list').fire('resize');
```
