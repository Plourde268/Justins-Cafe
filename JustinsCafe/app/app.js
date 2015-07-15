(function () {
    angular.module('CafeApp', ['ngRoute']).config(Config);

    function Config($routeProvider) {
        $routeProvider
        .when('/',
         {
             templateUrl: '/app/Views/view.html',
             controller: 'ViewController',
             controllerAs: 'vm'
         })
        .when('/menu',
        {
            templateUrl: '/app/Views/menu.html',
            controller: 'MenuController',
            controllerAs: 'vm'
        })
        .when('/add', {
            templateUrl: '/app/Views/add.html',
            controller: 'AddController',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: '/app/Views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
})();