var app = angular.module('brownBagApp', ['ui.bootstrap', 'ngResource']);


app.controller('menuController', function($scope, $http, $resource){

var Names = $resource('/names');
	$scope.names = Names.query();
	console.log($scope.names);

var Votes = $resource('/brownBag/insertVote');

var submitReset = function(){
	console.log("submit reset called");
	$scope.isSubmitDisabled = true;
}
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
  $scope.status = {};
  $scope.selected = {};
  $scope.selected = {
	name: "Your Name",
	preference: "Meal Preference",
	option: "Menu Option"	  
  }
  $scope.default = {
	name: "Your Name",
	preference: "Meal Preference",
	option: "Menu Option"
  }
  $scope.isSubmitDisabled = true;

  $scope.status = {
	  names: {
		  isopen: false
	  },
	  preferred: {
		  isopen: false
	  },
	  option: {
		  isopen: false
	  }
  };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

	//$scope.names=["Astha", "Aishwarya", "Chinmay", "Srikanth"];

	$scope.selectName = function(ev){
		submitReset();
		$scope.selected.name != $scope.default.name;
		$scope.selected.name = ev.target.dataset.ngValue;
		if($scope.selected.name != $scope.default.name && $scope.selected.preference != $scope.default.preference && $scope.selected.option != $scope.default.option){
			if($scope.selected.name!=undefined && $scope.selected.preference!= undefined && $scope.selected.option !=undefined){
			$scope.isSubmitDisabled = false;
			}
		}
	}
	$scope.selectPreference = function(ev){
		submitReset();
		$scope.selected.preference != $scope.default.preference;
		$scope.selected.preference = ev.target.text;
		if($scope.selected.name != $scope.default.name && $scope.selected.preference != $scope.default.preference && $scope.selected.option != $scope.default.option){
			if($scope.selected.name!=undefined && $scope.selected.preference!= undefined && $scope.selected.option !=undefined){
			$scope.isSubmitDisabled = false;
			}
		}
	}
	$scope.selectOption = function(ev){
		submitReset();
		$scope.selected.option != $scope.default.option
		$scope.selected.option = ev.target.text;
		if($scope.selected.name != $scope.default.name && $scope.selected.preference != $scope.default.preference && $scope.selected.option != $scope.default.option){
			if($scope.selected.name!=undefined && $scope.selected.preference!= undefined && $scope.selected.option !=undefined){
			$scope.isSubmitDisabled = false;
			}
		}
	}
	$scope.save = function(){
		var vote = new Votes({"name": $scope.selected.name, "preferred": $scope.selected.preference, "option": $scope.selected.option});
		console.log("vote: ",vote);
		Votes.save(vote);
	}
	$scope.getNames = function(){
		$http({method: 'GET', url: '/getNames'}).
		success(function(data, status, headers, config) {
			// this callback will be called asynchronously
			// when the response is available.
			console.log('todos: ', data );
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log('Oops and error', data);
		});
	}

	$scope.menuData = "";
    $scope.showVegMenu = function(){
		$scope.menuData = "Aaloo Gobhi Manchurian"
	}
	$scope.showNonVegMenu = function(){
		$scope.menuData = "Chicken";
	}
});

