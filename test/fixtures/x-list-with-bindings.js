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

      .item {
        color: white;
        height: 100px;
      }

      iron-list {
        overflow: hidden;
        background-color: black;
        height: 300px;
      }
    </style>

    <iron-list items="[[data]]" as="item" id="list">
      <template>
        <div class="item">
          <div item-scope-binding="">[[item.index]]</div>
          <div host-scope-property-binding="">[[propertyForReassignmentForwarding]]</div>
          <div host-scope-subproperty-binding="">[[propertyForPathChangeForwarding.text]]</div>
        </div>
      </template>
    </iron-list>
`,

  is: 'x-list-with-bindings',

  properties: {
    data: {
      type: Array
    },
    propertyForReassignmentForwarding: {
      type: String,
      value:"somePropertyText"
    },
    propertyForPathChangeForwarding: {
      type: Object,
      value: function(){
        return {text:"someSubPropertyText"}
      }
    }
  },

  get list() {
    return this.$.list;
  }
});
