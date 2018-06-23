/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE
The complete set of authors may be found at http://polymer.github.io/AUTHORS
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../iron-list.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        @apply --layout-fit;
        @apply --layout-vertical;

        display: block;
      }

      iron-list {
        overflow: hidden;
      }
    </style>
    
    <iron-list items="[[data]]" as="item" id="list" grid="">
      <template>
        <div class="item">
          <div style\$="[[_computeItemSize(itemSize, pre)]]" tabindex\$="[[_computedTabIndex(tabIndex, useTabIndex)]]">[[item.index]]</div>
        </div>
      </template>
    </iron-list>
`,

  is: 'x-grid',

  properties: {
    data: {
      type: Array
    },

    itemSize: {
      type: Number,
      value: 100
    },

    listSize: {
      type: Number,
      value: 300,
      observer: '_listSizeChanged'
    },

    pre: {
      type: Boolean,
      value: false
    },

    useTabIndex: {
      value: true,
      type: Boolean
    }
  },

  get list() {
    return this.$.list;
  },

  _computeItemSize: function(itemSize, pre) {
    var css = 'overflow: hidden;';
    css += pre ? 'white-space:pre;' : '';
    css += 'height: ' + itemSize + 'px;';
    css += 'width: ' + itemSize + 'px;';
    return css;
  },

  _listSizeChanged: function(listSize) {
    this.$.list.style.width = listSize + 'px';
    this.$.list.style.height = listSize + 'px';
  },

  _computedListSize: function(listHeight) {
    return 'height: ' + (listHeight) + 'px;' + 'width: ' + (listHeight) + 'px;';
  },

  _computedTabIndex: function(tabIndex, useTabIndex) {
    return useTabIndex ? tabIndex : undefined;
  }
});
