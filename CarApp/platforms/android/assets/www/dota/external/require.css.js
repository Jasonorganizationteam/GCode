define([],function(){if("undefined"==typeof window)return{load:function(e,t,n){n()}};var e=document.getElementsByTagName("head")[0],t=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;t[1]||t[7]?n=parseInt(t[1])<6||parseInt(t[7])<=9:t[2]||t[8]?r=!1:t[4]&&(n=parseInt(t[4])<18);var i={};i.pluginBuilder="./css-builder";var s,o,u,a=function(){s=document.createElement("style"),e.appendChild(s),o=s.styleSheet||s.sheet},f=0,l=[],c=function(e){f++,32==f&&(a(),f=0),o.addImport(e),s.onload=function(){h()}},h=function(){u();var e=l.shift();return e?(u=e[1],void c(e[0])):void (u=null)},p=function(e,t){if(o&&o.addImport||a(),o&&o.addImport)u?l.push([e,t]):(c(e),u=t);else{s.textContent='@import "'+e+'";';var n=setInterval(function(){try{s.sheet.cssRules,clearInterval(n),t()}catch(e){}},10)}},d=function(t,n){var i=document.createElement("link");if(i.type="text/css",i.rel="stylesheet",r)i.onload=function(){i.onload=function(){},setTimeout(n,7)};else var s=setInterval(function(){for(var e=0;e<document.styleSheets.length;e++){var t=document.styleSheets[e];if(t.href==i.href)return clearInterval(s),n()}},10);i.href=t,e.appendChild(i)};return i.normalize=function(e,t){return".css"==e.substr(e.length-4,4)&&(e=e.substr(0,e.length-4)),t(e)},i.load=function(e,t,r){(n?p:d)(t.toUrl(e+".css"),r)},i});