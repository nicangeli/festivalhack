'use strict';

var app = angular.module('festivalhack', []);

app.controller('MainController', function($scope, $http) {
	var vine_url = "proxy.php?tag=festivalhack";
	$scope.model = {
		contents: vine_url
	};
	$scope.vines = {};

	$scope.fetchFromVine = function() {
		console.log('yuouo');
		$http.get(vine_url)
			.success(function(data) {
				console.log(data.data.records);
				$scope.vines = data.data.records;
			})
			.error(function(error) {
				console.err(error);
			});
	};
});
