/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('mainApp').service('MathService',
    function(){
        var self = this;
        self.display = {
            result: 0,
            equation:[]
        };
        
        self.calcForm = {
            equal: true
        };
        
        self.setNumber = function(number){
            self.display.equation.push(number);
            console.log(self.display.equation);
        };
        
        return this;
    });
