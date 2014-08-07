/**
 * Copyright (c) 2011-2014 Activity, LLC.
 * Released under the MIT license:
 * https://github.com/rgr-myrg/DevShop-JS/raw/master/MIT-LICENSE
 */

(function( $ ) {
	$.Observable = function( $Object ) {
		var $Observable = function() {
			var observers = [];

			return {
				addObserver: function( observer ) {
					if ( (typeof observer === "function" || typeof observer === "object") && 
							typeof observer.update === "function" ){

						observers.push( observer );

						if ( typeof observer.onRegister === "function" ) {
							try {
								observer.onRegister();
							} catch( e ) {
							}
						}
					}
				},

				notifyObservers: function() {
					var size = observers.length;

					for ( var x = 0; x < size; x++ ) {
						var observer = observers[ x ];
						observer.update.apply( observer, arguments );
					}
				},
				getObservers: function() {
					return observers;
				}
			};
		};

		return $.ObjectFactory({
				_extends_ : $Observable,
				_public_  : $Object
		});
	};
})( DevShop );
