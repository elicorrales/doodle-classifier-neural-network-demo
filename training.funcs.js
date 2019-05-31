'use strict';

let totalErrorDelta = 1;
let outputErrors;
let thereWasACriticalError = false;
let allTrained = false;
let trainingStartTime = new Date().getTime();
let numTrainingCyclesBeforeTrained = 0;
let currentTrainingDataIndex = 0;

let displayResolution = 10;
let currDispCol = 0;
let currDispRow = 0;

const resetTrainingStatus = () => {
    background(0);
    doTrain = false;
    thereWasACriticalError = false;
    allTrained = false;
    trainingStartTime = new Date().getTime();
    numTrainingCyclesBeforeTrained = 0;
    currentTrainingDataIndex = 0;
    if (currentTrainingDataIsAllTrainedTrackingArray !== undefined) {
        for (let i = 0; i < currentTrainingDataIsAllTrainedTrackingArray.length; i++) {
            currentTrainingDataIsAllTrainedTrackingArray[i] = false;
            currentTrainingDataErrorTrackingArray[i] = 1;
        }
    }
}


const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const getNumOutputsInCurrentTrainingData = () => {
    for (let key in currentTrainingData) {
        if (currentTrainingData.hasOwnProperty(key)) {
            return currentTrainingData[key][0].outputs.length;
        }
        return 0;
    }
    return 0;
}

const getCurrentTrainingDataKeysAsArray = () => {

    let keysArray = [];
    for (let key in currentTrainingData) {
        if (currentTrainingData.hasOwnProperty(key)) {
            keysArray.push(key);
        }
    }
    return keysArray;
}


const isAllErrorsLessThanMin = (minErr, errors) => {
    if (errors === undefined || errors.length === 0) {
        throw 'danger', 'Missing errors during training?';
    }

    let sumOfErrors = 0;
    errors.forEach(e => { sumOfErrors += Math.abs(e); });

    let isGoodResult = sumOfErrors < (minErr * errors.length);

    return isGoodResult;
}



const train = () => {

    stroke(255);

    try {
        if (allTrained) {
            showMessages('success', 'All Trained ' + numTrainingCyclesBeforeTrained
                + ' cycles, Error: ' + parseFloat(totalErrorDelta).toFixed(4));
            doTrain = false;
            return;
        }

        let currentTime = new Date().getTime();
        let deltaTrainingTime = (currentTime - trainingStartTime) / 1000;
        let trainingWait = parseInt(trainingWaitSliderElem.value);
        showMessages('info', 'Training ' + parseInt(deltaTrainingTime).toFixed(1) + 'secs , at ' + numTrainingCyclesBeforeTrained + ' cycles ' + 'error: ' + parseFloat(totalErrorDelta).toFixed(4) + '...');
        if (deltaTrainingTime > trainingWait && !allTrained) {
            showMessages('danger', 'Time Ran Out');
            doTrain = false;
            return;
        }

        if (neuralNetwork !== undefined && currentTrainingData !== undefined && !isEmpty(currentTrainingData)) {

            //TRAIN
            let whichInputs = currentTrainingData[currentTrainingDataIndex];
            outputErrors = neuralNetwork.train(whichInputs.inputs, whichInputs.outputs);

            let sumErrors = 0;
            outputErrors.forEach(e => { sumErrors += Math.abs(e); });

            //DISPLAY PROGRESS
            let horzResolution = width / outputErrors.length;
            let vertResolution = height / outputErrors.length;
            let cols = width / horzResolution;
            let rows = height / vertResolution;

            let colorVal = Math.trunc(255 - 255 * (sumErrors / outputErrors.length));
            fill(colorVal, colorVal, colorVal);
            rect(currDispCol * horzResolution, currDispRow * vertResolution, horzResolution, vertResolution);
            currDispCol++;
            if (currDispCol >= cols) {
                currDispCol = 0;
                currDispRow++;
            }
            if (currDispRow >= rows) {
                currDispRow = 0;
            }

            //CHECK IF TRAINED
            let overallMaxTrainingErrorGoal = overallMaxTrainingErrorGoalSliderElem.value;
            let allErrorsLessThanMin = isAllErrorsLessThanMin(overallMaxTrainingErrorGoal, outputErrors);

            if (allErrorsLessThanMin) {
                allTrained = true;
            }

            currentTrainingDataIndex++;
            if (currentTrainingDataIndex >= currentTrainingData.length) {
                showMessages('danger', 'done with currentTraingData.length');
                doTrain = false;
                return;
            }

            if (allTrained) {
                showMessages('success', 'All Trained ' + numTrainingCyclesBeforeTrained
                    + ' cycles, Error: ' + parseFloat(totalErrorDelta).toFixed(4));
                doTrain = false;
                return;
            }



        } else {
            showMessages('danger', 'There was nothing to train');
            doTrain = false;
        }

    } catch (error) {
        console.log(error);
        showMessages('danger', error);
        thereWasACriticalError = true;
    }

}