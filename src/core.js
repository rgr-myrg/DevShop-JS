/**
 * Copyright (c) 2011 Roger Myrg http://devshop.me/
 * Released under the MIT license:
 * https://github.com/rgr-myrg/JavaScript-Observer-Plus/raw/master/MIT-LICENSE
 */
(function(){
	window.DevShop=typeof window.DevShop==='object'?window.DevShop:{};
	window.DevShop.Me=function(m){
		for(var i in m)
			if(m.hasOwnProperty(i))
				window.DevShop[i]=m[i];
		DevShop=devshop=window.DevShop;
	};
})();
