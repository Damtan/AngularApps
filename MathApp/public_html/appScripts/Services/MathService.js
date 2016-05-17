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
                equalIsPressed: false,
                numberOfSign: 0,
                numberIndex: 0,
                dotIsSet: false,
                numberIsSet: true
            };

            self.setEquation = function (variable) {
                if (isNaN(variable)) {
                    if (!self.signIsSet || self.display.equation === '') {
                        if (variable === '.' && !self.calcForm.dotIsSet && self.display.equation !== '') {
                            self.display.result[self.calcForm.numberIndex] += variable;
                            self.calcForm.dotIsSet = true;
                            self.display.equation += variable;
                            console.log('dodaje .');
                        } else {
                            if (variable !== '.') {
                                self.display.result.push(variable);
                                self.calcForm.numberIndex += 2;
                                self.calcForm.numberOfSign += 1;
                                self.signIsSet = !self.signIsSet;
                                self.display.equation += variable;
                                self.calcForm.dotIsSet = false;
                            }
                        }
                    }
                } else {
                    if (!self.calcForm.equalIsPressed) {
                        self.display.equation += variable;
                        self.calcForm.numberIsSet = true;
                        if (isNaN(self.display.result[self.calcForm.numberIndex])) {
                            self.display.result.push(variable.toString());
                        } else {
                            self.display.result[self.calcForm.numberIndex] += variable.toString();
                        }
                        self.signIsSet = false;
                    } else {
                        self.calcForm.equalIsPressed = !self.calcForm.equalIsPressed;
                        self.display.equation = '';
                        self.display.equation += variable;
                        if (isNaN(self.display.result[self.calcForm.numberIndex])) {
                            self.display.result.push(variable.toString());
                        } else {
                            self.display.result[self.calcForm.numberIndex] += variable.toString();
                        }
                        self.signIsSet = false;
                    }
                }
            };

            self.findDivide = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('/') !== -1) {
                        var tmpIndex = self.display.result.indexOf('/');
                        if (parseFloat(self.display.result[tmpIndex + 1]) === 0) {
                            return false;
                        }
                        if (self.display.result[tmpIndex + 1] === undefined) {
                            return;
                        } else {
                            var tmpResult = parseFloat(self.display.result[tmpIndex - 1]) / parseFloat(self.display.result[tmpIndex + 1]);
                        }
                        self.changeEquation(tmpIndex, tmpResult);
                        return true;

                    } else
                        return true;
                }
            };

            self.findMultiple = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('*') !== -1) {
                        var tmpIndex = self.display.result.indexOf('*');
                        if (self.display.result[tmpIndex + 1] === undefined) {
                            return;
                        } else {
                            var tmpResult = parseFloat(self.display.result[tmpIndex - 1]) * parseFloat(self.display.result[tmpIndex + 1]);
                            self.changeEquation(tmpIndex, tmpResult);
                        }
                    }
                }
            };

            self.findPlus = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('+') !== -1) {
                        var tmpIndex = self.display.result.indexOf('+');
                        if (self.display.result[tmpIndex + 1] === undefined) {
                            return;
                        } else {
                            var tmpResult = parseFloat(self.display.result[tmpIndex - 1]) + parseFloat(self.display.result[tmpIndex + 1]);
                            self.changeEquation(tmpIndex, tmpResult);
                        }
                    }
                }
            };

            self.findMinus = function () {
                for (var i = 0; i < self.calcForm.numberOfSign; i++) {
                    if (self.display.result.indexOf('-') !== -1) {
                        var tmpIndex = self.display.result.indexOf('-');
                        if (self.display.result[tmpIndex + 1] === undefined) {
                            return;
                        } else {
                            var tmpResult = parseFloat(self.display.result[tmpIndex - 1]) - parseFloat(self.display.result[tmpIndex + 1]);
                            self.changeEquation(tmpIndex, tmpResult);
                        }
                    }
                }
            };

            self.changeEquation = function (tmpIndex, tmpResult) {
                self.display.result[tmpIndex] = tmpResult;
                self.display.result.splice(tmpIndex + 1, 1);
                self.display.result.splice(tmpIndex - 1, 1);
            };

            self.compute = function () {
                if (!(isNaN(parseInt(self.display.result[self.display.result.length - 1])))) {
                    if (self.findDivide()) {
                        self.findMultiple();
                        self.findPlus();
                        self.findMinus();
                        if(self.display.result.toString().indexOf('.') === -1){
                            self.calcForm.dotIsSet = false;
                        }else self.calcForm.dotIsSet = true;
                        self.display.equation = self.display.result[0].toString();
                        self.calcForm.numberIndex = 0;
                    } else {
                        self.display.equation = '';
                        self.calcForm.numberIndex = 0;
                        self.display.result.splice(0, self.display.result.length);
                    }
                } else {
                    return;
                }
            };

            self.clean = function () {
                self.display.equation = '';
                self.calcForm.numberIndex = 0;
                self.display.result.splice(0, self.display.result.length);
                self.calcForm.dotIsSet = false;
                self.signIsSet = false;
            };

            return this;
        });
