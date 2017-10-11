angular.module('controllers', ["ngCookies"])

    .controller('EmpListController', ['$scope', '$location', 'Emp', '$rootScope',
        function($scope, $location, Emp, $rootScope) {

            // callback for ng-click 'createUser':
            $rootScope.refresh = function() {
                $scope.emps = [];
                var abc = Emp.query().$promise.then(
                    function(response) {
                        for (var i = 0; i < response.length; i++) {
                            $scope.emps.push(response[i]);
                        }
                    }
                );
            };

            $scope.emps = Emp.query();
            $scope.tabledi = false;
            $scope.tabledi2 = true;

            $scope.directivecall = function() {
                $scope.tabledi = true;
                $scope.tabledi2 = false;
                $scope.direc = true;
                $scope.backto = false;
                $scope.addemp = true;
                $scope.diremp = true;
                $scope.searchit = true;
            }

            $scope.newEmp = function() {
                $location.path('/employee/new');
            };

            $scope.cancel = function() {
                $scope.tabledi = false;
                $scope.tabledi2 = true;
                $scope.direc = false;
                $scope.backto = true;
                $scope.addemp = false;
                $scope.diremp = false;
                $scope.searchit = false;
            };

        }
    ])

    .controller('UserCreation', ['$scope', 'User', '$location', 'User1', '$cookies', '$http',
        function($scope, User, $location, User1, $cookies, $http) {
            $scope.register = {};
            $scope.login = true;
            $scope.welcome = "";
            $scope.tabledi = false;
            $scope.backto = true;
            $scope.direc = false;
            $scope.req={};
            $scope.req.user="";
            $scope.req.password="";
            $scope.success = false;
            $scope.lol = true;

            if ($cookies.get("userName")) {
                $scope.session($cookies.get("userName"));
            }

            $scope.logout = function() {
                $scope.admin = false;
                $location.path("/log");
                $cookies.remove("userName");
                $scope.req.user = null;
                $scope.req.password = null;
                $scope.login = true;
                $scope.dikhao = false;
                $scope.dikhao1 = false;
                $scope.success = false;
            }

            //<=======================================================
            // callback for ng-click 'createNewUser':
            $scope.create = function(register) {
                var cre= User.create(register);
                cre.$promise.then(function(response){
                alert("created");
                $scope.lol = !$scope.lol;
                $scope.cpassword = null;
                $scope.register.password = null;
                $scope.register.user = null;
                $location.path("/");
                })
            };

            $scope.abcdefg = true;
            $scope.check = function(req) {
                var pro = User1.checkit(req);
                pro.$promise.then(function(response) {
                    /* go to application */
                    if (response[0]['COUNT(*)'] === 1) {
                        $location.path("/employee");
                        $scope.abcdefg = false;
                        $scope.dikhao = true;
                        $scope.dikhao1 = true;
                        $scope.tabledi = false;
                        $scope.welcome = req.user;
                        $cookies.put("userName", req.user);
                        $scope.login = false;
                        $scope.success = true;
                    } else {
                        $location.path('/');
                        alert("You have entered Wrong Credentials");
                    }
                });
            };
            $scope.toggle = function() {
                $scope.lol = !$scope.lol;
            };
        }
    ])

    .controller('EmpEditController', ['$scope', '$routeParams', 'Emp1', 'Emp', '$location', '$rootScope',
        function($scope, $routeParams, Emp1, Emp, $location, $rootScope) {
            $scope.emps = [];
            // callback for ng-click 'deleteUser':
            $scope.deleteUser = function(emp_id) {
                  alert("Are You Sure?");
                  Emp1.delete(emp_id, function(res){
                    $rootScope.refresh();
                    $location.path('/employee');
                  });
                };
            // callback for ng-click 'editUser':
            $scope.editUser = function(emps) {
                var url = '/employee/' + emps.emp_id + '/edit';
                $scope.emps = emps;
                $location.path(url);
            };

            // callback for ng-click 'updateUser':
            $scope.updateUser = function() {
                Emp1.update($scope.emps,
                    function(response) {
                        $rootScope.refresh();
                        $location.path('/employee');
                    });
            };

            // callback for ng-click 'cancel':
            $scope.cancel = function() {
                $location.path('/employee');
            };

            Emp1.show({ emp_id: $routeParams.emp_id },function(response){
            $scope.emps= response[0];
        });
      }
    ])

    .controller('EmpCreateController', ['$scope', 'Emp', '$location', '$rootScope',
        function($scope, Emp, $location, $rootScope) {
            $scope.emps = {};
            // callback for ng-click 'createNewUser':
            $scope.createNewUser = function() {
                Emp.create($scope.emps,
                    function(response) {
                        $rootScope.refresh();
                        $location.path('/employee');

                    }
                );
            };

            // callback for ng-click 'cancel':
            $scope.cancel = function() {
                $location.path('/employee');
            };

        }
    ])

    .controller('EmpViewController', ['$scope', '$routeParams', 'Emp1', '$location',
        function($scope, $routeParams, Emp1, $location) {
            // callback for ng-click 'viewUser':
            var emps = [];
            $scope.viewUser = function(emp) {
                var url = '/employee/' + emp.emp_id + '/view';
                $scope.emps = emp;
                $location.path(url);
            };
            // callback for ng-click 'cancel':
            $scope.cancel = function() {
                $location.path('/employee');
            };
            Emp1.show({ emp_id: $routeParams.emp_id },function(response){
              $scope.emps=response[0];
            });
        }
    ]);
