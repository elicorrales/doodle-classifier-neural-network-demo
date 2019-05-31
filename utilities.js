'use strict';

const areTheseTwoGridArraysEqual = (a,b) => {
    if (a === b) return true;
    if (a.length != b.length) {
        console.log('array a and b are not the same length');
        return false;
    }
    for (let i=0; i<a.length; i++) {
        if (a[i] !== b[i]) {
            console.log('array a and b were differet at idx ' + i);
            return false;
        }
    }
    return true;
}
