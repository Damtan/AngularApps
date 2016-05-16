/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('mainApp').controller('MathController',['MathService',
    function(MathService){
        var self = this;
        
        self.display = MathService.display;
        self.calcForm = MathService.calcForm;
        self.compute = MathService.compute;
        self.setEquation = MathService.setEquation;
        return self;
    }]);
