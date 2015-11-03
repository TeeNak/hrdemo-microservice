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

    $scope.gridOptions = { 
        columnDefs: [
            { displayName: 'CODE', field: 'code', headerCellFilter: 'translate'},
            { displayName: 'NAME', field: 'name', headerCellFilter: 'translate'},
            { displayName: 'VERSION', field: 'version', headerCellFilter: 'translate', enableFiltering: false }
        ] 
    };

    $http.get('/hrdemo/jobs')
    .success(function(jsonData){
        $scope.gridOptions.data = jsonData._embedded.jobs;    
    });

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


