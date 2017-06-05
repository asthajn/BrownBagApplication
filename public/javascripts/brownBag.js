var app = angular.module('brownBagApp', []);
app.controller('menuController', function($scope, $http){
	$scope.menuData = "";
    $scope.showVegMenu = function(){
		$scope.menuData = "Aaloo Gobhi Manchurian"
	}
	$scope.showNonVegMenu = function(){
		$scope.menuData = "Chicken";
	}
});

