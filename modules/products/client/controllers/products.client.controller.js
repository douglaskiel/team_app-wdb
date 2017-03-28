(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productResolve'];

  function ProductsController ($scope, $state, $window, Authentication, product) {
    var vm = this;

    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.productList = [];
    vm.addMaterial = addMaterial;

    // Remove existing Product
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // add items to list array
    function addMaterial(isValid) {
      vm.productList.push({
        material: vm.product.material,
        priority: vm.product.priority,
        isChecked: false
      });

      vm.product.material = '';
      vm.product.priority = '';
    }
    // Save Product
    function save(isValid) {
      vm.product.materials = vm.productList;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update().then(
          $state.go('products.list')
          );
      } else {
        vm.product.$save().then(
          $state.go('products.list')
          );
      }

      // if (vm.product._id) {
      //   vm.product.$update(successCallback, errorCallback);
      // } else {
      //   vm.product.$save(successCallback, errorCallback);
      // }

      function successCallback(res) {
        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
