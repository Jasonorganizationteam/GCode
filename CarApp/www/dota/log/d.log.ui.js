define(["dInherit","dBaseLog","dDate"],function(e,t,n){var r=e(t.AbstractAdapter,{__propertys__:function(){this.tpl='<div class="J_infoLogAdapter">                        <a class="close" href="#">x</a>                        <button class="clear">CL</button>                        <div class="content">                            <ul class="J_tex"></ul>                        </div>                    </div>',this.style=".J_infoLogAdapter{background: #fff;z-index: 9999;border:1px solid #ddd;padding:20px;line-height:22px;font-family:tahoma,Simsun,sans-serif;color:#333;width:300px;height:500px;position:fixed;bottom:15px;right:10px;text-align:left;cursor: move;}                      .J_infoLogAdapter .close{position:absolute;top:5px;right:5px;text-decoration:none;width:15px;height:15px;color:#666;text-align:center;font:bold 16px/20px Simsun;}                      .J_infoLogAdapter .content{width:100%;height:100%;word-break:break-all;word-wrap:break-word;overflow:auto;}                      .J_infoLogAdapter ul{list-style:none}                      .J_infoLogAdapter li{padding-bottom:10px;font-weight: bold}                      .debug{color: #27c}                      .error{color: #EB3941}                      .log{color: #666}                      .info{color: #CCCCFF}                      .warn{color: #F5BD00}",this.wrap=$("body")},initialize:function(){this.__superInitialize.call(this),this.dom=$(this.tpl)[0],this._addStyle(this.style),this.hide(),this.wrap.append(this.dom),this.bindEvents()},bindEvents:function(){var e=this;e.dom.children[0].onclick=function(){e.hide()},e.dom.children[1].onclick=function(){var t=e.dom.children[e.dom.children.length-1].children[0];t.innerHTML=""}},show:function(){this.dom.style.display=""},hide:function(){this.dom.style.display="none"},off:function(){this._status=0,this.hide()},dispatch:function(e){if(this.isOff())return;var t=(new n(e.startTime)).toString(),r="["+e.level.toUpperCase()+"]"+t+"     "+e.message,i=this.dom.children[this.dom.children.length-1].children[0];$(i).appendChild('<li class="'+e.level.toLowerCase()+'">'+r+"</li>"),this.show()},setStyle:function(e){var t=this.dom,n=t.style,r;for(r in e)n.hasOwnProperty(r)&&(n[r]=e[r])},_addStyle:function(e){var t=document.createElement("style");return t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.innerHTML=e,document.getElementsByTagName("head")[0].appendChild(t),t.sheet}});return r});