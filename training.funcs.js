'use strict';

let numSamplesWithErrorsGreaterThanMinError = 0;
let outputErrors;
let thereWasACriticalError = false;
let allTrained = false;
let trainingStartTime = new Date().getTime();
let numTrainingCyclesBeforeTrained = 0;
let currentTrainingDataIndex = 0;
let RED = 0;
let BLU = 0;
let GRN = 0;
let incWhichColor = 0;

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
    numSamplesWithErrorsGreaterThanMinError = 0;
    RED = 0;
    BLU = 0;
    GRN = 0;
    incWhichColor = 0;

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


const isAnyErrorHigherThanMin = (minErr, errors) => {
    if (errors === undefined || errors.length === 0) {
        throw 'danger', 'Missing errors during training?';
    }

    let isHigher = false;
    errors.forEach(e => {  if (e > minErr) { isHigher = true; } });

    return isHigher;
}



const train = () => {

    stroke(255);

    try {
        if (allTrained) {
            showMessages('success', 'All Trained ' + numTrainingCyclesBeforeTrained 
                    + ' Num Samples With Error:' + numSamplesWithErrorsGreaterThanMinError
                    );
            doTrain = false;
            return;
        }

        let currentTime = new Date().getTime();
        let deltaTrainingTime = (currentTime - trainingStartTime) / 1000;
        let trainingWait = parseInt(trainingWaitSliderElem.value);
        showMessages('info', 'Training ' 
                        + parseInt(deltaTrainingTime).toFixed(1) + 'secs , ' 
                        + numTrainingCyclesBeforeTrained + ' Tot Samples ' 
                        + numSamplesWithErrorsGreaterThanMinError
                        + ' Error Samples, '
                        + ((numSamplesWithErrorsGreaterThanMinError/numTrainingCyclesBeforeTrained)*100).toFixed(2) + '% Bad' 
                        + '...');
        if (deltaTrainingTime > trainingWait && !allTrained) {
            showMessages('danger', 'Time Ran Out');
            doTrain = false;
            return;
        }

        if (neuralNetwork !== undefined && currentTrainingData !== undefined && !isEmpty(currentTrainingData)) {

            //TRAIN
            let whichInputs = currentTrainingData[currentTrainingDataIndex];
            outputErrors = neuralNetwork.train(whichInputs.inputs, whichInputs.outputs);
            let outputs = neuralNetwork.predict(whichInputs.inputs);
            let overallMaxTrainingErrorGoal = overallMaxTrainingErrorGoalSliderElem.value;
            let overallMaxTrainingErrorSamples = overallMaxTrainingErrorSamplesSliderElem.value;
            outputErrors.forEach(e => { if (e > overallMaxTrainingErrorGoal) { numSamplesWithErrorsGreaterThanMinError++; }});
            let fractionBad = (numSamplesWithErrorsGreaterThanMinError/currentTrainingData.length).toFixed(3);

            //DISPLAY PROGRESS
            let horzResolution = width / outputErrors.length;
            let vertResolution = height / outputErrors.length;
            let cols = width / horzResolution;
            let rows = height / vertResolution;
            let colorVal = Math.trunc(255*fractionBad);
            if (colorVal<0) colorVal = 0;
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


            numTrainingCyclesBeforeTrained++;
            currentTrainingDataIndex++;


            if (currentTrainingDataIndex >= currentTrainingData.length) {
                if (!autoRelearn) {
                    if (numSamplesWithErrorsGreaterThanMinError < overallMaxTrainingErrorSamples) {
                        showMessages('success', 'Trained, Used All Available Training Data'
                            +' Time: ' + parseInt(deltaTrainingTime).toFixed(1) + 'secs ,' 
                            + numTrainingCyclesBeforeTrained + ' Tot Samples ' 
                            + numSamplesWithErrorsGreaterThanMinError
                            + ' Error Samples, '
                            + ((numSamplesWithErrorsGreaterThanMinError/numTrainingCyclesBeforeTrained)*100).toFixed(2) + '% Bad' 
                            + '...');
                        allTrained = true;
                    } else {
                        showMessages('info', 'NOT Trained, Used All Available Training Data'
                            +' Time: ' + parseInt(deltaTrainingTime).toFixed(1) + 'secs , ' 
                            + numTrainingCyclesBeforeTrained + ' Tot Samples ' 
                            + numSamplesWithErrorsGreaterThanMinError
                            + ' Error Samples, '
                            + ((numSamplesWithErrorsGreaterThanMinError/numTrainingCyclesBeforeTrained)*100).toFixed(2) + '% Bad' 
                            + '...');
                    }
                    doTrain = false;
                    return;
                } else {
                    currentTrainingDataIndex = 0;
                }
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