angular.module('directives', [])

    .directive("myTable",['$http',
        function myTable($http) {
            return {
                restrict: "EA",
                templateUrl: "mydirective.html",
                scope: {
                    field: "@"
                },
                link: function(scope, elem, attr) {

                    scope.came = false;
                    scope.data = [];
                    scope.a = scope.field.split(" ");

                    $http.get('http://192.1.200.114:8080/EMSHHibernate/employee').then(
                        function(response) {
                            scope.data = response.data;
                            scope.tabledi=true;
                        });

                }

            }}]);
