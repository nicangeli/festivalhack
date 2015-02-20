'use strict';

var app = angular.module('festivalhack', []);

app.controller('MainController', function($scope) {
	$scope.model = {
		contents: 'Hello Michael And Nick'
	}
});
