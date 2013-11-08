define(['app', 'service/picturesService', 'ngload!ui-bootstrap', 'directive/navMenu'], function (app) {
        
    app.register.controller('PicturesController', ['$scope','Pictures', function ($scope, Pictures) {
        $scope.slideChangeInterval = 4000;
        
        $scope.$watch('cityModel', function (newValue) {
            if (newValue) {
                $scope.rows = Pictures.query(newValue);
            }
        });
        
    }]);

}); 
