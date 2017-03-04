'use strict';

/**
 * @ngdoc function
 * @name hrdemoUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hrdemoUiApp
 */
angular.module('hrdemoUiApp')
.controller('MainCtrl', ['$scope','i18nService','$http',
        function($scope,i18nService,$http) {
            $scope.langs = i18nService.getAllLangs();
            $scope.lang = 'ja';

            $scope.message = '';

            $scope.gridOptions = {
                columnDefs: [
                { displayName: 'CODE', field: 'code', headerCellFilter: 'translate'},
                { displayName: 'NAME', field: 'name', headerCellFilter: 'translate'},
                { displayName: 'VERSION', field: 'version', headerCellFilter: 'translate', enableFiltering: false }
                ]
            };

            $scope.doLoadData = function() {
                return $http.get('/hrdemo/jobs?size=100000')
                    .then(function(response){
                        $scope.gridOptions.data = response.data._embedded.jobs;
                    });
            };

            $scope.loadData = function() {
                $scope.doLoadData()
                    .then(function(){
                        $scope.message = 'Successfully loaded the data.';
                    });
            };

            $scope.saveData = function() {
                var data = $scope.gridOptions.data;
                $http.put('/hrdemo/jobs/list',data)
                    .then(function successCallback(){
                        //reload
                        $scope.doLoadData()
                            .then(function(){
                                $scope.message = 'Successfully saved and reloaded the data.';
                            });

                    },function errorCallback(response){
                        $scope.message = 'Something wrong.\n' + response.data.message;
                    }
                    );

            };


        }])
.config(function($translateProvider) {
    $translateProvider.translations('en', {
        CODE: 'Code',
        NAME: 'Name',
        VERSION: 'Version'
    });
    $translateProvider.translations('ja', {
        CODE: 'コード',
        NAME: '名前',
        VERSION: 'バージョン'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
});


