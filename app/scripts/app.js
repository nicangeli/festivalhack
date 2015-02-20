'use strict';

var app = angular.module('festivalhack', [
	'ngSanitize'
]);

app.controller('MainController', function($scope, $http, $sce, $interval) {
	var vine_url = "proxy.php?tag=festivalhack";
	$scope.model = {
		contents: vine_url
	};
	$scope.vines = [];
	$scope.rawVines = [];
	$scope.fetchFromVine = function() {
		//console.log('pull');
		$http.get(vine_url)
			.success(function(data) {
				//console.log(data);
				data.data.records.forEach(function(vine){
					if($scope.rawVines.indexOf(vine.videoUrl) == -1){
						$scope.vines.push($sce.trustAsResourceUrl(vine.videoUrl));
						$scope.rawVines.push(vine.videoUrl);
					}
				});
				$scope.vines = $scope.vines.splice(0, 15);						
			})
			.error(function(error) {
				console.err(error);
			});

	};
	$scope.fetchFromVineEnd = function() {
		//console.log('pull');
		$http.get(vine_url)
			.success(function(data) {
				//console.log(data);
				data.data.records.forEach(function(vine){
					if($scope.rawVines.indexOf(vine.videoUrl) == -1){
						$scope.vines.unshift($sce.trustAsResourceUrl(vine.videoUrl));
						$scope.rawVines.push(vine.videoUrl);
					}
				});					
				$scope.vines = $scope.vines.splice(0, 15);						
			})
			.error(function(error) {
				console.err(error);
			});
	};
	$scope.fetchFromVine();
	$interval(function(){
		$scope.fetchFromVineEnd();
	}, 5000);
});