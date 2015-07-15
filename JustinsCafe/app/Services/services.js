(function () {
    angular.module('CafeApp')
        .factory('menuService', menuService)
        .factory('loginService', loginService);

    function menuService($http, $q, $window) {

        var products = [];
        var initialDeferred = $q.defer();
        var token = $window.sessionStorage.getItem('token');
        var service = {};

        preloadProducts();

        service.getProducts = getProducts;
        service.addProduct = addProduct;
        //service.updateProduct = updateProduct;

        function preloadProducts() {
            
            $http({
                url: '/api/menu',
                method: 'GET',
                headers: {'Authorization' : 'Bearer ' + token}
            })
            .success(function (data) {
                console.log(data);

                data.forEach(function (product) {
                    products.push(product);
                })
                initialDeferred.resolve(products);
            })
            .error(function () {
                initialDeferred.reject();
            });
            
        }

        function getProducts () {
            return initialDeferred.promise;
        };
        
        function addProduct(product) {
            var deferred = $q.defer();
            $http({
                url: '/api/menu',
                method: 'POST',
                data: product,
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .success(function (data) {
                if (data) {
                    products.push(product);
                }
                deferred.resolve();
            })
            .error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        return service;
    }


    function loginService($http, $q, $window) {
        var service = {};

        service.login = login;

        function login(username, password) {
            var deferred = $q.defer();

            $http({
                url: '/Token',
                method: 'POST',
                data: 'username=' + username + '&password=' + password + '&grant_type=password',     //Hyper-Insecure
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                $window.sessionStorage.setItem('token', data.access_token);
                deferred.resolve();
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }
        return service;
    }
})();