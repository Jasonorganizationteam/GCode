define(["dInherit"],function(e){var t=e({add:function(e,t){this.hasOwnProperty(e)||(this[e]=t)},remove:function(e){this.hasOwnProperty(e)&&delete this[e]},update:function(e,t){this[e]=t},has:function(e){var t=typeof e;return t==="string"||t==="number"?this.hasOwnProperty(e):t==="function"&&this.some(e)?!0:!1},clear:function(){for(var e in this)this.hasOwnProperty(e)&&delete this[e]},empty:function(){for(var e in this)if(this.hasOwnProperty(e))return!1;return!0},each:function(e){for(var t in this)this.hasOwnProperty(t)&&e.call(this,this[t],t,this)},map:function(e){var n=new t;for(var r in this)this.hasOwnProperty(r)&&n.add(r,e.call(this,this[r],r,this));return n},filter:function(e){var n=new t;for(var r in this);},join:function(e){e=e!==undefined?e:",";var t=[];return this.each(function(e){t.push(e)}),t.join(e)},every:function(e){for(var t in this)if(this.hasOwnProperty(t)&&!e.call(this,this[t],t,this))return!1;return!0},some:function(e){for(var t in this)if(this.hasOwnProperty(t)&&e.call(this,this[t],t,this))return!0;return!1},find:function(e){var t=typeof e;if(t==="string"||t==="number"&&this.has(e))return this[e];if(t==="function")for(var n in this)if(this.hasOwnProperty(n)&&e.call(this,this[n],n,this))return this[n];return null}});return t});