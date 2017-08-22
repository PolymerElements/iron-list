import '../../../polymer/polymer.js';
import '../../../iron-flex-layout/iron-flex-layout.js';
import '../../iron-list.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
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
