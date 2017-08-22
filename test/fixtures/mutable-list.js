import '../../../polymer/polymer.js';
import '../../iron-list.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <iron-list id="list" mutable-data="">
      <template>
        <div>[[item.index]]</div>
      </template>
    </iron-list>
`,

  is: 'mutable-list',

  get list() {
    return this.$.list;
  }
});
