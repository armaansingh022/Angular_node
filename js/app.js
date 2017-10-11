angular.module('empApp', ['ui.bootstrap', 'ngRoute','services', 'controllers','directives']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/employee', { templateUrl: 'show.html', controller: 'EmpListController' })
    .when('/employee/:emp_id/view', { templateUrl: 'emp-view.html', controller: 'EmpViewController' })
    .when('/employee/:emp_id/edit', { templateUrl: 'emp-edit.html', controller: 'EmpEditController' })
    .when('/employee/new', { templateUrl: 'emp-add.html', controller: 'EmpCreateController' })
    .otherwise({ redirectTo: '/' });
}]);
