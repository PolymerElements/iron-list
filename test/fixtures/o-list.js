import '../../../polymer/polymer.js';
import '../../iron-list.js';
import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <iron-list id="list" items="{{items}}">
      <slot>
        <template>
          <div class="default-template">
            [[item.index]]
          </div>
        </template>
      </slot>
    </iron-list>
`,

  is: 'o-list'
});
