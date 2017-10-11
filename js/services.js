angular.module('services', ['ngResource'])

.factory('Emp', function($resource) {
  return $resource('http://192.1.200.114:8080/EMSHHibernate/employee', {}, {
        query: { method: 'GET' , isArray:true},
        create: { method: 'POST'}
  });
})

.factory('Emp1', function($resource) {
 return $resource('http://192.1.200.114:8080/EMSHHibernate/employee/:emp_id', {}, {
 	    show: { method: 'GET',isArray:true},
      update: { method: 'PUT', params: {emp_id: '@emp_id'}},
      delete: { method: 'DELETE', params: {emp_id: '@emp_id'}}
  });
})
.factory('User', function($resource) {
 return $resource('http://192.1.200.114:8080/EMSHHibernate/admin', {}, {
        create: { method: 'POST' , isArray:true }
  });
})
.factory('User1', function($resource) {
 return $resource('http://192.1.200.114:8080/EMSHHibernate/loginadmin', {}, {
        checkit: { method: 'POST' , isArray:true}
  });
});
