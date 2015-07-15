(function () {
    angular.module('CafeApp')
        .controller('ViewController', Welcome)
        .controller('MenuController', Menu)
        .controller('AddController', Add)
        .controller('LoginController', Login);

    function Welcome() {
        var vm = this;

        vm.message = 'Welcome Page';
    }

    function Menu(menuService) {
        var vm = this;

        vm.message = 'Menu Page';

        menuService.getProducts().then(function (products) {
            vm.menuItems = products;
        }, function () {

        });

    }

    function Add(menuService, $location) {
        var vm = this;

        vm.isLoading = false;

        vm.message = 'Add Page';

        vm.addItem = function () {

            vm.isLoading = true

            var product = {
                name: vm.name,
                price: vm.price,
                description: vm.description,
                isBreakfast: vm.isBreakfast ? vm.isBreakfast : false
            };

            menuService.addProduct(product).then(redirectToMenu, displayError);
        };

        function redirectToMenu() {
            vm.isLoading = false;
            $location.path('/menu');
        }

        function displayError() {
            vm.isLoading = false;
        }
    }

    function Login(loginService, $location) {
        var vm = this;

        vm.login = function () {
            loginService.login(vm.username, vm.password).then(loginSuccess, loginFail);
        }
        function loginSuccess() {
            $location.path('/menu');
        }

        function loginFail() {

        }
    }


})();