/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
                .when('/home',{
                    templateUrl: 'pages/home.html'
                })
                .when('/mathCalc',{
                     templateUrl: 'pages/mathCalc.html',
                     controller: 'MathController',
                     controllerAs: 'ctrl'
                        })
                .when('/contact',{
                    templateUrl: 'pages/contact.html'
                })
                .otherwise({
                  redirectTo: '/home'
              });
    }]);
