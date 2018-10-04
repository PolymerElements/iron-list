[![Published on NPM](https://img.shields.io/npm/v/@polymer/iron-list.svg)](https://www.npmjs.com/package/@polymer/iron-list)
[![Build status](https://travis-ci.org/PolymerElements/iron-list.svg?branch=master)](https://travis-ci.org/PolymerElements/iron-list)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/iron-list)

## &lt;iron-list&gt;
`iron-list` displays a virtual, 'infinite' list. The template inside
the iron-list element represents the DOM to create for each list item.
The `items` property specifies an array of list item data.

For performance reasons, not every item in the list is rendered at once;
instead a small subset of actual template elements *(enough to fill the viewport)*
are rendered and reused as the user scrolls. As such, it is important that all
state of the list template be bound to the model driving it, since the view may
be reused with a new model at any time. Particularly, any state that may change
as the result of a user interaction with the list item must be bound to the model
to avoid view state inconsistency.

### Sizing iron-list

`iron-list` must either be explicitly sized, or delegate scrolling to an
explicitly sized parent. By "explicitly sized", we mean it either has an explicit
CSS `height` property set via a class or inline style, or else is sized by other
layout means (e.g. the `flex` or `fit` classes).

#### Flexbox - [jsbin](https://jsbin.com/vejoni/edit?html,output)

```html
<style>
  :host {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  iron-list {
    flex: 1;
  }
</style>
<app-toolbar>App name</app-toolbar>
<iron-list items="[[items]]">
  <template>
    <div>
      ...
    </div>
  </template>
</iron-list>
```
#### Explicit size - [jsbin](https://jsbin.com/vopucus/edit?html,output)
```html
<style>
  :host {
    display: block;
  }

  iron-list {
    height: 100vh; /* don't use % values unless the parent element is sized. */
  }
</style>
<iron-list items="[[items]]">
  <template>
    <div>
      ...
    </div>
  </template>
</iron-list>
```
#### Main document scrolling - [jsbin](https://jsbin.com/wevirow/edit?html,output)
```html
<head>
  <style>
    body {
      margin: 0;
    }
  </style>
</head>
<body>
  <iron-list scroll-target="document">
    <template>
      <div>
        ...
      </div>
    </template>
  </iron-list>
</body>
```

`iron-list` must be given a `<template>` which contains exactly one element. In the examples
above we used a `<div>`, but you can provide any element (including custom elements).

### Template model

List item templates should bind to template models of the following structure:

```js
{
  index: 0,        // index in the item array
  selected: false, // true if the current item is selected
  tabIndex: -1,    // a dynamically generated tabIndex for focus management
  item: {}         // user data corresponding to items[index]
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
The following code would render the list (note the name property is bound from the model
object provided to the template scope):
```html
<iron-ajax url="data.json" last-response="{{data}}" auto></iron-ajax>
<iron-list items="[[data]]" as="item">
  <template>
    <div>
      Name: [[item.name]]
    </div>
  </template>
</iron-list>
```

### Grid layout

`iron-list` supports a grid layout in addition to linear layout by setting
the `grid` attribute.  In this case, the list template item must have both fixed
width and height (e.g. via CSS). Based on this, the number of items
per row are determined automatically based on the size of the list viewport.

### Accessibility

`iron-list` automatically manages the focus state for the items. It also provides
a `tabIndex` property within the template scope that can be used for keyboard navigation.
For example, users can press the up and down keys, as well as the left and right
keys (the `grid` attribute is present), to move to focus between items in the list:

```html
<iron-list items="[[data]]" as="item">
  <template>
    <div tabindex$="[[tabIndex]]">
      Name: [[item.name]]
    </div>
  </template>
</iron-list>
```

### Styling

You can use the `--iron-list-items-container` mixin to style the container of items:

```css
iron-list {
 --iron-list-items-container: {
    margin: auto;
  };
}
```

### Resizing

`iron-list` lays out the items when it receives a notification via the `iron-resize` event.
This event is fired by any element that implements `IronResizableBehavior`.

By default, elements such as `iron-pages`, `paper-tabs` or `paper-dialog` will trigger
this event automatically. If you hide the list manually (e.g. you use `display: none`)
you might want to implement `IronResizableBehavior` or fire this event manually right
after the list became visible again. For example:

```js
document.querySelector('iron-list').fire('iron-resize');
```

### When should `<iron-list>` be used?

`iron-list` should be used when a page has significantly more DOM nodes than the ones
visible on the screen. e.g. the page has 500 nodes, but only 20 are visible at a time.
This is why we refer to it as a `virtual` list. In this case, a `dom-repeat` will still
create 500 nodes which could slow down the web app, but `iron-list` will only create 20.

However, having an `iron-list` does not mean that you should load all the data at once.
For example, if you have a million records in the database, it is better split the data into pages
so you can bring in a page at a time. The page could contain 500 items, and iron-list
might only render 20.

See: [Documentation](https://www.webcomponents.org/element/@polymer/iron-list),
  [Demo](https://www.webcomponents.org/element/@polymer/iron-list/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/iron-list
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/iron-list/iron-list.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        iron-list {
          height: 100vh; /* don't use % values unless the parent element is sized. */
        }
      </style>
      <iron-list items="[[items]]">
        <template>
          <div>
            ...
          </div>
        </template>
      </iron-list>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/iron-list
cd iron-list
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
