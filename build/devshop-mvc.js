/**
 * Copyright (c) 2011 Roger Myrg http://devshop.me/
 * Released under the MIT license:
 * https://github.com/rgr-myrg/DevShop-JS/raw/master/MIT-LICENSE
 */
(function(b){b.DevShop=typeof b.DevShop==="object"?b.DevShop:{}})(window);(function(b){b.SingletonFactory=function(b){var d=function(a){if(typeof a==="function")try{return new a}catch(c){}else if(typeof a==="object")return a},f=d(b.implement),c=d(b.extend),d=d(b.instance),a;for(a in c)c.hasOwnProperty(a)&&(d[a]||(d[a]=c[a]));for(a in f)if(f.hasOwnProperty(a)&&!d[a])throw b.instance+" must implement '"+a+"' "+typeof f[a];if(typeof d.initialize==="function")try{d.initialize()}catch(g){}return d}})(DevShop);(function(b){b.Observable=function(e){return b.SingletonFactory({extend:function(){this.observers=[];this.addObserver=function(d){if((typeof d==="function"||typeof d==="object")&&typeof d.notify==="function")if(this.observers.push(d),typeof d.onRegister==="function")try{d.onRegister()}catch(b){}};this.notifyObservers=function(d){for(var b=this.observers.length,c=0;c<b;c++)try{this.observers[c].notify(d,this)}catch(a){}}},instance:e})}})(DevShop);(function(b){b.Observer=function(e){return b.SingletonFactory({extend:function(){this.onRegister=function(){};this.notify=function(d,b){this.observable=b;if(typeof this[d]==="function")try{this[d]()}catch(c){}}},instance:e})}})(DevShop);(function(b){b.IProxy={NAME:""};b.IMediator={NAME:"",listNotificationInterests:function(){},handleNotification:function(){}};b.ICommand={execute:function(){}};b.Proxy=function(){var b={};this.facade=null;this.setData=function(d){b=d};this.getData=function(){return b};this.onRegister=function(){};this.onRemove=function(){}};b.Mediator=b.Observer(function(){this.facade=null;this.onRegister=function(){};this.onRemove=function(){}});b.Facade=function(){var e=new function(){var c={};this.facade={};this.registerProxy=
function(a){a.facade=this.facade;c[a.NAME]||(c[a.NAME]=a);if(typeof a.onRegister==="function")try{a.onRegister()}catch(b){}};this.retrieveProxy=function(a){return c[a]?c[a]:null};this.removeProxy=function(a){if(typeof c[a].onRemove==="function")try{c[a].onRemove()}catch(b){}c[a]=null}},d=new b.Observable(function(){var c={};this.facade={};this.notification={};this.registerMediator=function(a){a.facade=this.facade;c[a.NAME]||(c[a.NAME]=a,this.addObserver(a))};this.retrieveMediator=function(a){return c[a]?
c[a]:null};this.removeMediator=function(a){if(typeof c[a].onRemove==="function")try{c[a].onRemove()}catch(b){}c[a]=null};this.notifyObservers=function(a){for(var c=this.observers.length,b=0;b<c;b++)try{for(var d=this.observers[b].listNotificationInterests(),e=!1,f=0;l=d.length,f<l;f++)if(d[f]==this.notification.name){e=!0;break}if(e)this.observers[b].notification=this.notification,this.observers[b].notify(a,this)}catch(h){}};this.sendNotification=function(a){this.notification=a;this.notifyObservers("handleNotification")}}),
f=new b.Observer(function(){var c={},a=[];this.facade={};this.NAME="DevShop.Controller";this.registerCommand=function(b,d){d.facade=this.facade;c[b]||(c[b]=d,a.push(b))};this.listNotificationInterests=function(){return a};this.handleNotification=function(){var a=this.notification;if(typeof c[a.name]==="object"&&typeof c[a.name].execute==="function")try{c[a.name].execute(a)}catch(b){}}});this.CMD_STARTUP="CMD_STARTUP";this.registerProxy=function(c){e.registerProxy(c)};this.registerMediator=function(c){d.registerMediator(c)};
this.registerCommand=function(c,a){f.registerCommand(c,a)};this.retrieveProxy=function(c){return e.retrieveProxy(c)};this.retrieveMediator=function(c){return d.retrieveMediator(c)};this.removeProxy=function(c){e.removeProxy(c)};this.removeMediator=function(c){d.removeMediator(c)};this.sendNotification=function(c,a,b){d.sendNotification({name:c,body:a,type:b})};this.initializeFacade=function(){e.facade=this;d.facade=this;f.facade=this;this.registerMediator(f)}}})(DevShop);
