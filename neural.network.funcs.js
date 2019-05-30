'use strict';

const nnNumInputsElem = document.getElementById('nnNumInputs');
const nnNumHiddenElem = document.getElementById('nnNumHidden');
const nnNumOutputsElem = document.getElementById('nnNumOutputs');
const learningRateSliderElem = document.getElementById('learningRateSlider');
const learningRateElem = document.getElementById('learningRate');
const trainingWaitSliderElem = document.getElementById('trainingWaitSlider');
const trainingWaitElem = document.getElementById('trainingWait');
const autoRelearnElem = document.getElementById('autoRelearn');

let neuralNetwork;
let doTrain = false;

const doTrainNetwork = () => {
    try {
        clearMessages();
        resetTrainingStatus();
        modeShowTrainingTestImagesOnCanvas = false;

        let numIn = parseInt(nnNumInputsElem.value);
        let numHid = parseInt(nnNumHiddenElem.value);
        let numOut = parseInt(nnNumOutputsElem.value);
        let sqrt = Math.sqrt(numIn);
        let badNumber = numIn % sqrt;
        if (badNumber) {
            showMessages('danger', 'Attempted to Create Network. Need Inputs that make Square (9, 16, 25, etc)');
            return;
        }
        neuralNetwork = new NeuralNetwork(numIn, numHid, numOut);
        //showMessages('success', 'New Network Created');
        doTrain = true;
    } catch (error) {
        showMessages('danger', 'Inside doCreateNetwork: ' + error);
        console.log(error);
    }
}

const doTestNetwork = () => {
    try {
        test();
    } catch (error) {
        showMessages('danger', 'Inside doCreateNetwork: ' + error);
        console.log(error);
    }

}

const doChangeLearningRate = () => {
    let learningRate = learningRateSliderElem.value;
    learningRateElem.innerHTML = learningRate;
    doTrainNetwork();
}

const doChangeTrainingWaitTime = () => {
    let wait = trainingWaitSliderElem.value;
    trainingWaitElem.innerHTML = wait;
    doTrainNetwork();
}

const doDoodle = () => {
    doClearCanvas();
}

const doGuess = () => {
    guess();
}