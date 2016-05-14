/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
                .when('/',{
                    templateUrl: 'index.html'
                });
    }]);
