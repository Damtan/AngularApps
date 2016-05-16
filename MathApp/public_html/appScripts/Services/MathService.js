/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('mainApp').service('MathService',
        function () {
            var self = this;
            self.display = {
                result: [],
                equation: ''
            };

            self.signIsSet = false;

            self.calcForm = {
                equal: false,
                numberOfSign: 0,
                numberIndex: 0
            };

            self.setEquation = function (variable) {
                if (isNaN(variable)) {
                    if (!self.signIsSet && (self.display.equation !== '')) {
                        self.display.equation += variable;
                        self.display.result.push(variable);
                        self.calcForm.numberIndex += 2;
                        self.calcForm.numberOfSign += 1;
                        console.log(self.display.result);
                    }
                } else {
                    if (!self.calcForm.equal) {
                        self.display.equation += variable;
                        if (isNaN(self.display.result[self.calcForm.numberIndex])) {
                            self.display.result.push(variable.toString());
                        } else {
                            self.display.result[self.calcForm.numberIndex] += variable;
                        }
                        console.log(self.display.result);
                        self.signIsSet = false;
                    } else {
                        self.calcForm.equal = !self.calcForm.equal;
                        self.display.equation = '';
                        self.display.equation += variable;
                        if (isNaN(self.display.result[self.calcForm.numberIndex] += variable)) {
                            self.display.result.push(variable);
                        } else {
                            self.display.result[self.calcForm.numberIndex] += variable;
                        }
                        self.signIsSet = false;
                        console.log(self.display.result);
                    }
                }
            };


            self.findDivide = function () {
                //TODO :  divide by 0!
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('/') !== -1) {
                        var tmpIndex = self.display.result.indexOf('/');
                        var tmpResult = parseInt(self.display.result[tmpIndex - 1]) / parseInt(self.display.result[tmpIndex + 1]);
                        self.display.result[tmpIndex] = tmpResult;
                        self.display.result.splice(tmpIndex + 1, 1);
                        self.display.result.splice(tmpIndex - 1, 1);
                        self.calcForm.numberOfSign -= 1;
                    }
                }
            };

            self.findMultiple = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('*') !== -1) {
                        var tmpIndex = self.display.result.indexOf('*');
                        var tmpResult = parseInt(self.display.result[tmpIndex - 1]) * parseInt(self.display.result[tmpIndex + 1]);
                        self.display.result[tmpIndex] = tmpResult;
                        self.display.result.splice(tmpIndex + 1, 1);
                        self.display.result.splice(tmpIndex - 1, 1);
                        self.calcForm.numberOfSign -= 1;
                    }
                }
            };

            self.findPlus = function () {
                console.log(self.calcForm.numberOfSign);
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('+') !== -1) {
                        var tmpIndex = self.display.result.indexOf('+');
                        var tmpResult = parseInt(self.display.result[tmpIndex - 1]) + parseInt(self.display.result[tmpIndex + 1]);
                        self.display.result[tmpIndex] = tmpResult;
                        self.display.result.splice(tmpIndex + 1, 1);
                        self.display.result.splice(tmpIndex - 1, 1);
                        self.calcForm.numberOfSign -= 1;
                    }
                }
            };

            self.findMinus = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('-') !== -1) {
                        var tmpIndex = self.display.result.indexOf('-');
                        var tmpResult = parseInt(self.display.result[tmpIndex - 1]) - parseInt(self.display.result[tmpIndex + 1]);
                        self.display.result[tmpIndex] = tmpResult;
                        self.display.result.splice(tmpIndex + 1, 1);
                        self.display.result.splice(tmpIndex - 1, 1);
                        self.calcForm.numberOfSign -= 1;
                    }
                }
            };

            self.compute = function () {
                self.findDivide();
                self.findMultiple();
                self.findPlus();
                self.findMinus();
                self.display.equation = self.display.result;
               // self.display.result.splice(0,self.display.result.length);
                self.calcForm.equal = !self.calcForm.equal;
                self.calcForm.numberIndex = 0;
            };

            return this;
        });
