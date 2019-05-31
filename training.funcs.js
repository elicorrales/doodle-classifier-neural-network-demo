'use strict';

let totalErrorDelta = 1;
let outputErrors;
let thereWasACriticalError = false;
let allTrained = false;
let trainingStartTime = new Date().getTime();
let numTrainingCyclesBeforeTrained = 0;
let currentTrainingDataIndex = 0;

const resetTrainingStatus = () => {
    background(0);
    doTrain = false;
    thereWasACriticalError = false;
    allTrained = false;
    trainingStartTime = new Date().getTime();
    numTrainingCyclesBeforeTrained = 0;
    if (currentTrainingDataIsAllTrainedTrackingArray !== undefined) {
        for (let i=0; i<currentTrainingDataIsAllTrainedTrackingArray.length; i++) {
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

const isAllErrorsLessThanMin = (minErr, data, errors, useThisFuncForTestResultsOnly) => {
    if (data === undefined || data.length === 0 || errors === undefined || errors.length === 0 || data.length !== errors.length) {
        throw 'danger', 'Cant Train: Data Array Len ('
        + data.length
        + ') incompatible with Errors Array Len ('
        + errors.length
        + '). You might be missing some shape(digit?).'
        + ' You can add it to the training data, or you can reduce the Network output nodes.';
    }

    let whichDataIdxIsHigh;
    for (let i=0; i<data.length; i++) {
        if (data[i]===1) {
            whichDataIdxIsHigh = i;
        }
    }

    let delta = Math.abs(data[whichDataIdxIsHigh] - errors[whichDataIdxIsHigh]);
    let isGoodResult =  delta < minErr;

    if (useThisFuncForTestResultsOnly) { return isGoodResult; }

    if (isGoodResult) {
        currentTrainingDataIsAllTrainedTrackingArray[whichDataIdxIsHigh] = true;
        currentTrainingDataErrorTrackingArray[whichDataIdxIsHigh] = errors[whichDataIdxIsHigh];
    }

    for (let i=0; i<currentTrainingDataIsAllTrainedTrackingArray.length; i++) {
        if (!currentTrainingDataIsAllTrainedTrackingArray[i]) {
            return false;
        }
    }
    
    return true;
}


const train = () => {

    /*
        if (currentTrainingData === undefined || currentTrainingData.length < 1) {
            showMessages('danger','No Training Data Selected Or There is no data');
            return;
        }
    
        if (thereWasACriticalError) return;
        if (timeRanOut) return;
    */
    try {
        /*
                //background(0);
       */
        if (allTrained) {
            showMessages('success', 'All Trained ' + numTrainingCyclesBeforeTrained 
                                                + ' cycles, Error: ' + parseFloat(totalErrorDelta).toFixed(4));
            doTrain = false;
            return;
        }

        let currentTime = new Date().getTime();
        let deltaTrainingTime = (currentTime - trainingStartTime) / 1000;
        let trainingWait = parseInt(trainingWaitSliderElem.value);
        if (!allTrained) showMessages('info', 'Training ' + parseInt(deltaTrainingTime).toFixed(1) 
                                                            + 'secs , at ' + numTrainingCyclesBeforeTrained + ' cycles '
                                                            + 'error: ' + parseFloat(totalErrorDelta).toFixed(4) + '...');
        if (deltaTrainingTime > trainingWait && !allTrained) {
            showMessages('danger', 'Time Ran Out');
            doTrain = false;
            return;
        }

        if (neuralNetwork !== undefined && currentTrainingData !== undefined && !isEmpty(currentTrainingData)) {
        //if (neuralNetwork !== undefined && currentTrainingData !== undefined && currentTrainingData.length>0) {

            if (!allTrained) {
                for (let i = 0; i < currentTrainingData.length; i++) {
                    numTrainingCyclesBeforeTrained++;
                    //let whichInputs = currentTrainingData[currentTrainingDataIndex];
                    let whichInputs = currentTrainingData[i];
                    currentTrainingDataIndex++;
                    if (currentTrainingDataIndex>=currentTrainingData.length) currentTrainingDataIndex = 0;
                    outputErrors = neuralNetwork.train(whichInputs.inputs, whichInputs.outputs);
                    let allErrorsLessThanMin = isAllErrorsLessThanMin(0.03, whichInputs.outputs, outputErrors);
                    if (outputErrors !== undefined) {
                        totalErrorDelta = 0;
                        outputErrors.forEach(e => totalErrorDelta+= Math.abs(e));
                    } else {
                        totalErrorDelta = 1;
                    }
                    if (allErrorsLessThanMin && totalErrorDelta<0.9) {
                        allTrained = true;
                        break;
                    };
                    let outputs = neuralNetwork.predict(whichInputs.inputs);
                    //console.log(outputs);
                }
            }

            if (!allTrained) showMessages('info', 'Training ' + parseInt(deltaTrainingTime).toFixed(1) 
                                                            + 'secs , at ' + numTrainingCyclesBeforeTrained + ' cycles '
                                                            + 'error: ' + parseFloat(totalErrorDelta).toFixed(4) + '...');
            //if (!allTrained) {
                neuralNetwork.setLearningRate(learningRateSliderElem.value);
                background(0);
                let resolution = 10;//numOutputs*4;
                let cols = width / resolution;
                let rows = height / resolution;
                let whichInputs = currentTrainingData[currentTrainingDataIndex];
                currentTrainingDataIndex++;
                if (currentTrainingDataIndex>=currentTrainingData.length) currentTrainingDataIndex = 0;
                //let outputs = neuralNetwork.predict(whichInputs.inputs);
                let whichOutputError = 0;
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        noStroke();
                        let colorVal = 0;
                        let colorDeltaFactor = Math.abs(outputErrors[whichOutputError]);
                        if (colorDeltaFactor < 0.01) {
                            colorVal = 255;
                        } else {
                            colorVal = 255 - 250 * (colorDeltaFactor/Math.abs(1-colorDeltaFactor));
                        }
                        fill(colorVal, colorVal, colorVal);
                        rect(i * resolution, j * resolution, resolution, resolution);
                        whichOutputError++;
                        if (whichOutputError>=outputErrors.length) { whichOutputError=0;}
                    }
                }
            //}

            doTrain = false;


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