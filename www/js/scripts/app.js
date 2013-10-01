angular.module("ngreq-app", ['ngRoute', 'customDirectives', 'dataServices'])
.config(function ($routeProvider) {
    $routeProvider
        .when("/view1", { templateUrl: "views/view1.html", controller: "View1Controller" })
        .when("/view2", { templateUrl: "views/view2.html", controller: "View2Controller" })
        .when("/view3", { templateUrl: "views/view3.html", controller: "View3Controller" })
        .otherwise({redirectTo: '/view1'})
});