'use strict';

let isReadyToTest = false;
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
    isReadyToTest = false;
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

/*
const getNumOutputsInCurrentTrainingData = () => {
    for (let key in currentTrainingData) {
        if (currentTrainingData.hasOwnProperty(key)) {
            return currentTrainingData[key][0].outputs.length;
        }
        return 0;
    }
    return 0;
}
*/

/*
const getCurrentTrainingDataKeysAsArray = () => {

    let keysArray = [];
    for (let key in currentTrainingData) {
        if (currentTrainingData.hasOwnProperty(key)) {
            keysArray.push(key);
        }
    }
    return keysArray;
}
*/

/*
const isAnyErrorHigherThanMin = (minErr, errors) => {
    if (errors === undefined || errors.length === 0) {
        throw 'danger', 'Missing errors during training?';
    }

    let isHigher = false;
    errors.forEach(e => { if (e > minErr) { isHigher = true; } });

    return isHigher;
}
*/


const limitOutErrorsArrayForDisplay = () => {
    let display = '';
    if (outputErrors !== undefined) {
        outputErrors.forEach( o => display += Math.abs(o).toFixed(5) + ' ');
    }
    return display;
}

const train = () => {

    stroke(255);

    try {
        if (allTrained) {
            showMessages('success', 'All Trained ');
            doTrain = false;
            return;
        }

        let currentTime = new Date().getTime();
        let deltaTrainingTime = (currentTime - trainingStartTime) / 1000;
        let trainingWait = parseInt(trainingWaitSliderElem.value);
        showMessages('info', 'Training '
            + parseInt(deltaTrainingTime).toFixed(1) + 'secs' 
            + ', Tot Samples: ' + numTrainingCyclesBeforeTrained 
            + ', Errors: ' + limitOutErrorsArrayForDisplay()
            + '...');
        if (deltaTrainingTime > trainingWait && !allTrained) {
            showMessages('danger', 'Time Ran Out');
            doTrain = false;
            return;
        }

        if (neuralNetwork !== undefined && currentTrainingData !== undefined && !isEmpty(currentTrainingData)) {

            let fractionBad = 0;
            for (let someCycles = 0; someCycles < 500; someCycles++) {
                if (currentTrainingDataIndex >= currentTrainingData.length) {
                    break;
                }
                //TRAIN
                let whichInputs = currentTrainingData[currentTrainingDataIndex];
                currentTrainingDataIndex++;
                numTrainingCyclesBeforeTrained++;
                outputErrors = neuralNetwork.train(whichInputs.inputs, whichInputs.outputs);
            }

            switch (outputErrors.length) {
                case 1:
                    let color = 255 * Math.abs(outputErrors[0]);
                    red = color; blue = color; green = color;
                    break;
                case 2:
                    red = 255 * Math.abs(outputErrors[0]);
                    green = 255 * Math.abs(outputErrors[1]);
                    blue = 255;
                    break;
                case 3:
                    red = 255 * Math.abs(outputErrors[0]);
                    green = 255 * Math.abs(outputErrors[1]);
                    blue = 255 * Math.abs(outputErrors[2]);
                    break;
                default:
                    red = 255 * Math.abs(outputErrors[0]);
                    green = 255 * Math.abs(outputErrors[1]);
                    blue = 255 * Math.abs(outputErrors[2]);
                    alpha = 255 * Math.abs(outputErrors[3]);
                    break;
            }


            //DISPLAY PROGRESS
            let horzResolution = width / outputErrors.length;
            let vertResolution = height / outputErrors.length;
            let cols = width / horzResolution;
            let rows = height / vertResolution;
            let colorVal = Math.trunc(255 * fractionBad);
            if (colorVal < 0) colorVal = 0;
            fill(red, blue, green, alpha);
            rect(currDispCol * horzResolution, currDispRow * vertResolution, horzResolution, vertResolution);
            currDispCol++;
            if (currDispCol >= cols) {
                currDispCol = 0;
                currDispRow++;
            }
            if (currDispRow >= rows) {
                currDispRow = 0;
            }


            currentTrainingDataIndex++;


            if (currentTrainingDataIndex >= currentTrainingData.length) {
                shuffle(currentTrainingData);
                isReadyToTest = true;
                if (!autoRelearn) {
                    if (allTrained) {
                        showMessages('success', 'Trained, Used All Available Training Data'
                            + ' Time: ' + parseInt(deltaTrainingTime).toFixed(1) + 'secs'
                            + ', Tot Samples: ' + numTrainingCyclesBeforeTrained 
                            + ', Errors: ' + limitOutErrorsArrayForDisplay()
                            + '...');
                    } else {
                        showMessages('info', 'NOT Trained, Used All Available Training Data'
                            + ' Time: ' + parseInt(deltaTrainingTime).toFixed(1) + 'secs'
                            + ', Tot Samples: ' + numTrainingCyclesBeforeTrained 
                            + ', Errors: ' + limitOutErrorsArrayForDisplay()
                            + '...');
                    }
                    doTrain = false;
                    return;
                } else {
                    currentTrainingDataIndex = 0;
                }
            }


        } else {
            showMessages('danger', 'There was nothing to train, either missing data, or missing network.');
            doTrain = false;
        }

    } catch (error) {
        console.log(error);
        showMessages('danger', error);
        thereWasACriticalError = true;
    }

}
