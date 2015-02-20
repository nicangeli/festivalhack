'use strict';

var app = angular.module('festivalhack', []);

app.controller('MainController', function($scope) {
	var vine_url = "https://api.vineapp.com/timelines/tags/<tag>";
	$scope.model = {
		tag: 'Default',
		contents: vine_url
	};

	$scope.submit = function() {
		$scope.model.contents = vine_url.replace('<tag>', $scope.model.tag);
	};
});
