(function(e,t){e.Ancients={init:!1,dir:"",serviceDir:"http://www.ctrip.com/restful/",animation:!0,isFunction:function(e){return typeof e=="undefined"?!1:Array.prototype.toString.call(e)==="[object Function]"},loadJs:function(e,n){var r=this.isFunction(n);script=t.createElement("script"),script.type="text/javascript",script.src=e,script.readyState?script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete")script.onreadystatechange=null,r&&n()}:script.onload=function(){r&&n()},t.body.appendChild(script)},config:function(e){e.dir&&typeof e.dir=="string"&&(this.dir=e.dir,this.frameworkDir=this.dir+"/dota/"),e.serviceDir&&typeof e.serviceDir=="string"&&(this.serviceDir=e.serviceDir)}},Ancients.frameworkDir=Ancients.dir+"/dota/";var n=document.querySelectorAll("script"),r,i;for(var s=0;s<n.length;s++){r=n[s].getAttribute("pgConfig");if(r&&r.length){i=r;break}}Ancients.loadJs(Ancients.frameworkDir+"external/require.min.js",function(){Ancients.loadJs(Ancients.frameworkDir+"config.js",function(){})})})(window,document);