'use strict';

const nnNumInputsElem = document.getElementById('nnNumInputs');
const nnNumHiddenElem = document.getElementById('nnNumHidden');
const nnNumOutputsElem = document.getElementById('nnNumOutputs');
const learningRateSliderElem = document.getElementById('learningRateSlider');
const learningRateElem = document.getElementById('learningRate');
const trainingWaitSliderElem = document.getElementById('trainingWaitSlider');
const trainingWaitElem = document.getElementById('trainingWait');

const autoRelearnElem = document.getElementById('autoRelearn');

const minRequiredTestPercentCorrectSliderElem = document.getElementById('minRequiredTestPercentCorrectSlider');
const minRequiredTestPercentCorrectElem = document.getElementById('minRequiredTestPercentCorrect');

let neuralNetwork;
let doTrain = false;
let doTest = false;
let autoRelearn = autoRelearnElem.checked;

const doCreateTrainNetwork = () => {
    try {
        doClearCanvas();
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

        if (currentTrainingData === undefined || currentTrainingData[0].outputs.length !== numOut) {
            showMessages('danger','Training Data Missing Or Num Selected Classes do NOT match Network Outputs (' + numOut + ')');
            return;
        }

        neuralNetwork = new NeuralNetwork(numIn, numHid, numOut);
        showMessages('success', 'New Network Created');
        neuralNetwork.setLearningRate(learningRateSliderElem.value);
        //doTrain = true;
    } catch (error) {
        showMessages('danger', 'Inside doCreateTrainNetwork: ' + error);
        console.log(error);
    }
}



const doTrainNetwork = () => {
    try {
        doClearCanvas();
        clearMessages();
        resetTrainingStatus();
        modeShowTrainingTestImagesOnCanvas = false;

        let numIn = parseInt(nnNumInputsElem.value);
        let numOut = parseInt(nnNumOutputsElem.value);
        let sqrt = Math.sqrt(numIn);
        let badNumber = numIn % sqrt;
        if (badNumber) {
            showMessages('danger', 'Attempted to Train Network. Need Inputs that make Square (9, 16, 25, etc)');
            return;
        }

        if (currentTrainingData === undefined || currentTrainingData[0].outputs.length !== numOut) {
            showMessages('danger','Training Data Missing Or Num Selected Classes do NOT match Network Outputs (' + numOut + ')');
            return;
        }

        doTrain = true;
        doTest = true;
    } catch (error) {
        showMessages('danger', 'Inside doTrainNetwork: ' + error);
        console.log(error);
    }
}

const doTestNetwork = () => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    try {

        test();

    } catch (error) {
        showMessages('danger', 'Inside doTestNetwork: ' + error);
        console.log(error);
    }
}

const doChangeLearningRate = (slider) => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    let learningRate = slider.value;
    //let learningRate = learningRateSliderElem.value;
    learningRateElem.innerHTML = learningRate;
    resetTrainingStatus();
}

const doChangeTrainingWaitTime = (slider) => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    let wait = slider.value;
    //let wait = trainingWaitSliderElem.value;
    trainingWaitElem.innerHTML = wait;
    resetTrainingStatus();
}

const doAutoRelearn = () => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    autoRelearn = autoRelearnElem.checked;
}

const doChangeMinRequiredTestPercentCorrect = (slider) => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    let percent = slider.value;
    minRequiredTestPercentCorrect.innerHTML = percent;
    resetTrainingStatus();
}


const doDoodle = () => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
}

const doGuess = () => {
    clearMessages();
    resetTrainingStatus();
    guess();
}