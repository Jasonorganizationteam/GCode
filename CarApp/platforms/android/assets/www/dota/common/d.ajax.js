define(["dValidate","dStore","libs"],function(e,t){function o(e){!e.url.startsWith("http://")&&!e.url.startsWith("https://")&&(e.url=Ancients.serviceDir+e.url);var n={url:e.url,type:r(e.type),dataType:e.dataType,data:e.data,contentType:e.contentType,timeout:e.timeout||i.timeout,beforeSend:function(t){$.type(e.beforeSend)==="function"&&e.beforeSend(t)},success:function(n,r,i){e.store instanceof t&&e.store.set(n),$.type(e.success)==="function"&&e.success(n)},error:function(t){$.type(e.error)==="function"&&e.error(t)}};$.ajax(n)}var n={json:"application/json",jsonp:"application/json"},r=function(e){return e&&(e=n[e]?n[e]:e),e||n.json},i={timeout:2e4,global:!0,accepts:n.json},s={ajaxStart:function(){},ajaxSend:function(){},ajaxSuccess:function(){},ajaxError:function(){},ajaxComplete:function(){},ajaxStop:function(){}};return{get:function(t,r,i,s){var u={url:t,success:e.isFunction(r)?r:function(){},error:e.isFunction(i)?i:function(){},dataType:n.json,type:"GET",store:s};return o(u)},post:function(t,r,i,s){var u={url:t,success:e.isFunction(r)?r:function(){},error:e.isFunction(i)?i:function(){},dataType:n.json,type:"POST",store:s};return o(u)}}});