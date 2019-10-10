/**
@license
Copyright (c) 3015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE The complete set of authors may be found at
http://polymer.github.io/AUTHORS The complete set of contributors may be found
at http://polymer.github.io/CONTRIBUTORS Code distributed by Google as part of
the polymer project is also subject to an additional IP rights grant found at
http://polymer.github.io/PATENTS
*/
import '@polymer/polymer/polymer-legacy.js';

import '../../iron-list.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  is: 'odd-sized-list',
  _template: html`
    <style>
      :host {
        display: block;
        width: 300px;
        height: 300px;
        border: 1px solid black;
      }
      iron-list {
        height: 100%;
      }
      .item {
        overflow: hidden;
        border-bottom: 1px solid gray;
      }
    </style>
    <iron-list id="list" items="{{items}}">
      <template>
        <div class="item" style="height: [[item]]px;">Item [[index]] ([[item]]px)</div>
      </template>
    </iron-list>`,
  properties: {
    items: {
      value: function() {
        // Some hand-tuned sizes to ensure the physical average
        // after scrolling back up is such to trigger the bug
        const items = [];
        while (items.length < 70) {
          items.push(30);
        }
        while (items.length < 90) {
          items.push(90);
        }
        while (items.length < 5000) {
          items.push(30);
        }
        return items;
      }
    }
  }
});
