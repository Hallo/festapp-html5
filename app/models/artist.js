// The contents of individual model .js files will be concatenated into dist/models.js

(function() {

// Protects views where angular is not loaded from errors
if ( typeof angular == 'undefined' ) {
	return;
};


var module = angular.module('ArtistModel', ['restangular']);

module.factory('ArtistRestangular', function(Restangular) {
	return Restangular.withConfig(function(RestangularConfigurer) {
	RestangularConfigurer.setBaseUrl('http://festapp-server.herokuapp.com/api/v1');
	RestangularConfigurer.setRestangularFields({
		id: "_id"
	});
});


})();
