/**
 * Copyright (c) 2011-2014 Activity, LLC.
 * Version: 1.0.0
 * Built: Fri Aug 08 2014 07:27:00 GMT-0400 (EDT)
 * Released under the MIT license:
 * https://github.com/rgr-myrg/pattern-js/raw/master/MIT-LICENSE
 */
(function(w){w.Pattern=w.Pattern||{};})(window);(function(c){c.Queue=function(a){var e=null,c=null,d=!1,b=function(){},h=function(){},j=300,i=-1,g=[];if(typeof a!=="object"||!a.id)throw Error("Queue options Object is Null");e=a.id;if(!isNaN(a.timeToWait)&&a.timeToWait>0)j=a.timeToWait;if(!isNaN(a.maxCount)&&a.maxCount>0)i=a.maxCount;if(typeof a.callback==="function")b=a.callback;if(typeof a.onError==="function")h=a.onError;return{add:function(){if(i>0&&g.length>=i)return h(Error("Max count exceeded: "+g.length)),!1;g.push(arguments);return!0},
start:function(){if(!d)try{c=setInterval(e+".run()",j)}catch(b){h(b)}},run:function(){if(g.length>0){d=!0;try{b.apply(this,g.shift())}catch(a){this.stop(),h(a)}}else this.stop()},stop:function(){d=!1;clearInterval(c)},isRunning:function(){return d},count:function(){return g.length},clear:function(){this.stop();g=[]}}}})(Pattern);
(function(c){c.ObjectFactory=function(a){if(typeof a!=="object")throw"Object not provided";var e=function(b){if(typeof b==="function")try{return new b}catch(d){}else if(typeof b==="object")return b},c=e(a._implements_),d=e(a._extends_),a=e(a._public_),b;for(b in d)d.hasOwnProperty(b)&&!a[b]&&(a[b]=d[b]);for(b in c)if(c.hasOwnProperty(b)&&!a[b])throw object.instance+" must implement '"+b+"' "+typeof c[b];if(typeof a.init==="function")try{a.init()}catch(h){}return a}})(Pattern);
(function(c){c.MVCObservable=function(a){return c.ObjectFactory({_extends_:function(){return{observers:[],addObserver:function(a){if((typeof a==="function"||typeof a==="object")&&typeof a.notify==="function")if(this.observers.push(a),typeof a.onRegister==="function")a.onRegister()},notifyObservers:function(a){for(var c=this.observers.length,d=0;d<c;d++)this.observers[d].notify(a,this)}}},_public_:a})};c.MVCObserver=function(a){return c.ObjectFactory({_extends_:function(){return{onRegister:function(){},
notify:function(a,c){this.observable=c;if(typeof this[a]==="function")try{this[a]()}catch(d){}}}},_public_:a})};c.IProxy={NAME:""};c.IMediator={NAME:"",listNotificationInterests:function(){},handleNotification:function(){}};c.ICommand={execute:function(){}};c.Proxy=function(){var a={};return{facade:null,setData:function(c){a=c},getData:function(){return a},onRegister:function(){},onRemove:function(){}}};c.Mediator=c.MVCObserver(function(){return{facade:null,onRegister:function(){},onRemove:function(){}}});
c.Facade=function(){var a=function(){var d={};return{facade:{},registerProxy:function(b){b.facade=this.facade;d[b.NAME]||(d[b.NAME]=b);if(typeof b.onRegister==="function")b.onRegister()},retrieveProxy:function(b){return d[b]?d[b]:null},removeProxy:function(b){if(typeof d[b].onRemove==="function")d[b].onRemove();d[b]=null}}}(),e=c.MVCObservable(function(){var d={};return{facade:{},notification:{},registerMediator:function(b){b.facade=this.facade;d[b.NAME]||(d[b.NAME]=b,this.addObserver(b))},retrieveMediator:function(b){return d[b]?
d[b]:null},removeMediator:function(b){if(typeof d[b].onRemove==="function")d[b].onRemove();d[b]=null},notifyObservers:function(b){for(var d=this.observers.length,a=0;a<d;a++){for(var c=this.observers[a].listNotificationInterests(),e=!1,f=0,k=c.length;f<k;f++)if(c[f]==this.notification.name){e=!0;break}if(e)this.observers[a].notification=this.notification,this.observers[a].notify(b,this)}},sendNotification:function(b){this.notification=b;this.notifyObservers("handleNotification")}}}),f=new c.MVCObserver(function(){var a=
{},b=[];return{facade:{},NAME:"Controller",registerCommand:function(c,e){e.facade=this.facade;a[c]||(a[c]=e,b.push(c))},listNotificationInterests:function(){return b},handleNotification:function(){var b=this.notification;typeof a[b.name]==="object"&&typeof a[b.name].execute==="function"&&a[b.name].execute(b)}}});return{CMD_STARTUP:"CMD_STARTUP",registerProxy:function(d){a.registerProxy(d)},registerMediator:function(a){e.registerMediator(a)},registerCommand:function(a,b){f.registerCommand(a,b)},retrieveProxy:function(d){return a.retrieveProxy(d)},
retrieveMediator:function(a){return e.retrieveMediator(a)},removeProxy:function(d){a.removeProxy(d)},removeMediator:function(a){e.removeMediator(a)},sendNotification:function(a,b,c){e.sendNotification({name:a,body:b,type:c})},initializeFacade:function(){a.facade=this;e.facade=this;f.facade=this;this.registerMediator(f)}}}})(Pattern);
