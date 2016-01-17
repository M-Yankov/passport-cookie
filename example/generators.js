'use strict';

function generateRandomToken() {
    var symbols = 'ABCDEF1234567890';
    var token = '';
    for (var i = 0, tokLen = 20; i < tokLen; i += 1) {
        token += symbols[getRandomArbitrary(0, symbols.length - 1)];
    }

    return token;
}

function getRandomArbitrary(min, max) {
    var a = Math.random() * (max - min) + min;
    return Math.round(a);
}

module.exports = {
    generateRandomToken: generateRandomToken
};