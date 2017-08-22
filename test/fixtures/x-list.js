import '../../../polymer/polymer.js';
import '../../../iron-flex-layout/iron-flex-layout.js';
import '../../iron-list.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <style>
      :host {
        display: block;
      }

      .item {
        color: white;
        overflow: hidden;
      }

      .item:nth-child(odd) {
        background-color: green;
      }

      .item:nth-child(even) {
        background-color: red;
      }

      iron-list {
        background-color: black;
      }
    </style>

    <iron-list items="[[data]]" as="item" id="list">
      <template>
        <div class="item" selected\$="[[selected]]">
          <div style\$="[[_computedItemHeight(item)]]" tabindex\$="[[_computedTabIndex(tabIndex, useTabIndex)]]" hidden\$="[[primitive]]">[[item.index]]</div>
          <div style\$="[[_computedItemHeight(item)]]" tabindex\$="[[_computedTabIndex(tabIndex, useTabIndex)]]" hidden\$="[[!primitive]]">[[item]]</div>
        </div>
      </template>
    </iron-list>
`,

  is: 'x-list',

  properties: {
    data: {
      type: Array
    },

    itemHeight: {
      type: Number,
      value: 100
    },

    listHeight: {
      type: Number,
      value: 300,
      observer: '_listHeightChanged'
    },

    pre: {
      type: Boolean
    },

    primitive: {
      value: false,
      type: Boolean
    },

    useTabIndex: {
      value: true,
      type: Boolean
    }
  },

  get list() {
    return this.$.list;
  },

  _computedItemHeight: function(item) {
    var css = this.pre ? 'white-space:pre;' : '';
    if (item.height) {
      css += this.itemHeight === 0 ? '' : 'height: ' + (item.height) + 'px;';
    } else if (this.itemHeight) {
      css += 'height: ' + (this.itemHeight) + 'px;';
    }
    return css;
  },

  _computedTabIndex: function(tabIndex, useTabIndex) {
    return useTabIndex ? tabIndex : undefined;
  },

  _listHeightChanged(height) {
    this.$.list.style.height = height + 'px';
    this.style.height = height + 'px';
  }
});
