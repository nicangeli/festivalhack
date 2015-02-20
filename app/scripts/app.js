'use strict';

var app = angular.module('festivalhack', []);

app.controller('MainController', function($scope, $http) {
	var vine_url = "https://api.vineapp.com/timelines/tags/festivalhack";
	$scope.model = {
		contents: vine_url
	};

	$scope.fetchFromVine = function() {
		console.log('yuouo');
		$http.get(vine_url)
			.success(function(data) {
				console.log(data);
			})
			.error(function(error) {
				console.err(error);
			});
	};
});
