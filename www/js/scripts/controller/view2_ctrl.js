define(['app', 'dataServices', 'ui-bootstrap', 'navMenu'], function (app) {
        
    app.register.controller('View2Controller', ['$scope','Pictures', function ($scope, Pictures) {
        $scope.slideChangeInterval = 4000;
        
        $scope.$watch('cityModel', function (newValue) {
            if (newValue) {
                $scope.rows = Pictures.query(newValue);
            }
        });
        
    }]);

}); 
