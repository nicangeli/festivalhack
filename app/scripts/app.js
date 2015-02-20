'use strict';

var app = angular.module('festivalhack', [
	'ngSanitize',
	'wu.masonry'
]);

app.config(function($logProvider){
  $logProvider.debugEnabled(true);
});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('MainController', function($scope, $http, $sce, $interval, $rootScope) {
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
/*angular.module('myApp.directives', [])
  .directive("masonry", function($parse, $timeout) {
    return {
      restrict: 'AC',
      link: function (scope, elem, attrs) {
        elem.masonry({ itemSelector: '.masonry-brick'});
        // Opitonal Params, delimited in class name like:
        // class="masonry:70;"
        //elem.masonry({ itemSelector: '.masonry-item', columnWidth: 140, gutterWidth: $parse(attrs.masonry)(scope) });
      },
      controller : function($scope,$element){
          var bricks = [];
          this.appendBrick = function(child, brickId, waitForImage){
            function addBrick() {
              $element.masonry('appended', child, true);

              // If we don't have any bricks then we're going to want to 
              // resize when we add one.
              if (bricks.length === 0) {
                // Timeout here to allow for a potential
                // masonary timeout when appending (when animating
                // from the bottom)
                $timeout(function(){
                  $element.masonry('resize');  
                });  
              }

              // Store the brick id
              var index = bricks.indexOf(brickId);
              if (index === -1) {
                bricks.push(brickId);
              }
            }

            if (waitForImage) {
              child.imagesLoaded(addBrick);      
            } else {
              addBrick();
            }
          };

          // Removed bricks - we only want to call masonry.reload() once
          // if a whole batch of bricks have been removed though so push this
          // async.
          var willReload = false;
          function hasRemovedBrick() {
            if (!willReload) {
              willReload = true;
              $scope.$evalAsync(function(){
                willReload = false;
                $element.masonry("reload");
              });
            }
          }

          this.removeBrick = function(brickId){
              hasRemovedBrick();
              var index = bricks.indexOf(brickId);
              if (index != -1) {
                bricks.splice(index,1);
              }
          };
      }
    };     
  })
  .directive('masonryBrick', function ($compile) {
    return {
      restrict: 'AC',
      require : '^masonry',
      link: function (scope, elem, attrs, MasonryCtrl) {

      elem.imagesLoaded(function () {
        MasonryCtrl.appendBrick(elem, scope.$id, true);
      });

      scope.$on("$destroy",function(){
          MasonryCtrl.removeBrick(scope.$id);
      }); 
    }
  };
});*/
