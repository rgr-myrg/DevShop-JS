/**
 * Copyright (c) 2011-2014 Activity, LLC.
 * Version: 1.0.0
 * Built: Fri Aug 08 2014 07:26:28 GMT-0400 (EDT)
 * Released under the MIT license:
 * https://github.com/rgr-myrg/pattern-js/raw/master/MIT-LICENSE
 */
(function(w){w.Pattern=w.Pattern||{};})(window);(function(f){f.Queue=function(a){var c=null,d=null,b=!1,e=function(){},f=function(){},i=300,h=-1,g=[];if(typeof a!=="object"||!a.id)throw Error("Queue options Object is Null");c=a.id;if(!isNaN(a.timeToWait)&&a.timeToWait>0)i=a.timeToWait;if(!isNaN(a.maxCount)&&a.maxCount>0)h=a.maxCount;if(typeof a.callback==="function")e=a.callback;if(typeof a.onError==="function")f=a.onError;return{add:function(){if(h>0&&g.length>=h)return f(Error("Max count exceeded: "+g.length)),!1;g.push(arguments);return!0},
start:function(){if(!b)try{d=setInterval(c+".run()",i)}catch(a){f(a)}},run:function(){if(g.length>0){b=!0;try{e.apply(this,g.shift())}catch(a){this.stop(),f(a)}}else this.stop()},stop:function(){b=!1;clearInterval(d)},isRunning:function(){return b},count:function(){return g.length},clear:function(){this.stop();g=[]}}}})(Pattern);
(function(f){f.ObjectFactory=function(a){if(typeof a!=="object")throw"Object not provided";var c=function(a){if(typeof a==="function")try{return new a}catch(b){}else if(typeof a==="object")return a},d=c(a._implements_),b=c(a._extends_),a=c(a._public_),e;for(e in b)b.hasOwnProperty(e)&&!a[e]&&(a[e]=b[e]);for(e in d)if(d.hasOwnProperty(e)&&!a[e])throw object.instance+" must implement '"+e+"' "+typeof d[e];if(typeof a.init==="function")try{a.init()}catch(f){}return a}})(Pattern);
(function(f){f.EventSignal=function(){var a=[];return{addListener:function(c){typeof c==="function"&&a.push(c)},removeListener:function(c){for(var d=a.length,b=0;b<d;b++)a[b]===c&&(a[b]=null)},dispatch:function(){for(var c=[],d=a.length,b=0;b<d;b++){var e=a[b];typeof e==="function"?e.apply(this,arguments):c.push(b)}d=c.length;for(b=0;b<d;b++)a.splice(b,1)}}}})(Pattern);
(function(f){f.Publisher=function(){var a={};return{registerEvents:function(c){typeof c==="object"&&(a=c)},registerSubscriber:function(c){if(typeof c.onRegister==="function"){var d=c.onRegister(),b;for(b in d)d.hasOwnProperty(b)&&typeof d[b]==="function"&&typeof a[b]==="object"&&typeof a[b].addListener==="function"&&a[b].addListener(d[b]);c.onRegister=function(){}}},notify:function(a,d){typeof a.dispatch==="function"&&a.dispatch(d)}}}})(Pattern);
