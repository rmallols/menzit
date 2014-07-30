'use strict';

app.controller('TestsAdminCtrl', ['$scope', 'category', function ($scope, category) {
    $scope.category = category;
    console.log('De aqui deberian salir los tests, en un array dentro de category, de modo que habria que hacer una nueva query que se los trajera todos, procesando en backend y seguramente invocado desde el adminApp');
}]);