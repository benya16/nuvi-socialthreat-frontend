/**
 * Created by benya16 on 18/04/2017.
 */
angular.module('myApp').controller('MainController', ['$scope', '$location', function($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation == $location.path();
    }

}]);