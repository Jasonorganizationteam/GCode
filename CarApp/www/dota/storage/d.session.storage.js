define(["dInherit","dAbstractStorage"],function(e,t){var n=e(t,{__propertys__:function(){this.proxy=window.sessionStorage}});return n.getInstance=function(){return this.instance?this.instance:this.instance=new this},n});