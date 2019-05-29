'use strict';

const nnNumInputsElem = document.getElementById('nnNumInputs');
const nnNumHiddenElem = document.getElementById('nnNumHidden');
const nnNumOutputsElem = document.getElementById('nnNumOutputs');
let trainingStartTime = new Date().getTime();
let neuralNetwork;

const doCreateNetwork = () => {
    clearMessages();
    let numIn = parseInt(nnNumInputsElem.value);
    let numHid = parseInt(nnNumHiddenElem.value);
    let numOut = parseInt(nnNumOutputsElem.value);
    let sqrt = Math.sqrt(numIn);
    let badNumber = numIn%sqrt;
    if (badNumber) {
        showMessages('danger','Need Inputs that make Square (9, 16, 25, etc)');
        return;
    }
    neuralNetwork = new NeuralNetwork(numIn, numHid, numOut);
    showMessages('success','New Network Created');
    trainingStartTime = new Date().getTime();
}

const doTrainNetwork = () => {
    clearMessages();
    if (neuralNetwork!==undefined) {
        train();
    } else {
        showMessages('danger','No Network Created');
    }
}

const doChangeLearningRate = () => {
    clearMessages();
    let learningRate = learningRateSliderElem.value;
    learningRateElem.innerHTML = learningRate;
    doCreateNetwork();
}

const doChangeTrainingWaitTime = () => {
    clearMessages();
    let wait = trainingWaitSliderElem.value;
    trainingWaitElem.innerHTML = wait;
    doCreateNetwork();
}

const doAutoRelearn = () => {
    autoRelearn = autoRelearnElem.checked;
}
