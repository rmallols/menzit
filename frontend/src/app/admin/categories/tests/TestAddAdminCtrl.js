'use strict';

app.controller('TestAddAdminCtrl', ['$scope', '$state', 'http',
    function ($scope, $state, http) {
        console.log('ALL THE TEST STUFF SHOULD BE RENAMED TO QUESTION')
        console.log('deberiamos cambiar el orden: al crear un test, se deberia guardar la referencia a la categoria. Esto es trivial con $scope.test.categoryId' +
            'al reves: al mostrar tests, se deberia buscar en rest/tests?categoryId=aaa, de forma que el inDecorator de tests coja ese categoryId y solo saque los tests que lo tengan' +
            'definitivamente esta es la forma buena, que que sino p.e. cuando borraramos un test habria que actualizar el test del array de categories ')
        $scope.title = 'Add test';
        $scope.correctOptionIndex = 0;
        $scope.test = {
            answers: [{}, {}, {}]
        };

        $scope.submit = function () {
            angular.forEach($scope.test.answers, function(answer, $index) {
                answer.isCorrect = $index === Number($scope.correctOptionIndex);
            });
            http.post('/rest/tests/', $scope.test).then(function () {
                $state.go('app.admin.tests', { categoryId: $state.params.categoryId });
            });
        };
    }]);