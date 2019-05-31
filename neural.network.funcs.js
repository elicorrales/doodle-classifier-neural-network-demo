'use strict';

const nnNumInputsElem = document.getElementById('nnNumInputs');
const nnNumHiddenElem = document.getElementById('nnNumHidden');
const nnNumOutputsElem = document.getElementById('nnNumOutputs');
const learningRateSliderElem = document.getElementById('learningRateSlider');
const learningRateElem = document.getElementById('learningRate');
const trainingWaitSliderElem = document.getElementById('trainingWaitSlider');
const trainingWaitElem = document.getElementById('trainingWait');

const overallMaxTrainingErrorGoalSliderElem = document.getElementById('overallMaxTrainingErrorGoalSlider');
const overallMaxTrainingErrorGoalElem = document.getElementById('overallMaxTrainingErrorGoal');
const maxTestingErrorGoalSliderElem = document.getElementById('maxTestingErrorGoalSlider');
const maxTestingErrorGoalElem = document.getElementById('maxTestingErrorGoal');



let neuralNetwork;
let doTrain = false;

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
        //showMessages('success', 'New Network Created');
        neuralNetwork.setLearningRate(learningRateSliderElem.value);
        doTrain = true;
    } catch (error) {
        showMessages('danger', 'Inside doCreateTrainNetwork: ' + error);
        console.log(error);
    }
}

const doTrainNetworkAgain = () => {
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
    } catch (error) {
        showMessages('danger', 'Inside doTrainNetworkAgain: ' + error);
        console.log(error);
    }
}

const doTestNetwork = () => {
    try {
        doClearCanvas();
        if (toggleUseTrainingOrTestingData) {
            testWithTrainingData();
        } else {
            testWithTestingData();
        }

    } catch (error) {
        showMessages('danger', 'Inside doTestNetwork: ' + error);
        console.log(error);
    }

}

const doChangeLearningRate = (slider) => {
    let learningRate = slider.value;
    //let learningRate = learningRateSliderElem.value;
    learningRateElem.innerHTML = learningRate;
    resetTrainingStatus();
}

const doChangeTrainingWaitTime = (slider) => {
    let wait = slider.value;
    //let wait = trainingWaitSliderElem.value;
    trainingWaitElem.innerHTML = wait;
    resetTrainingStatus();
}

const doChangeOverallMaxTrainingErrorGoal = (slider) => {
    let errorGoal = slider.value;
    overallMaxTrainingErrorGoalElem.innerHTML = errorGoal;
    resetTrainingStatus();
}

const doChangeMaxTestingErrorGoal = (slider) => {
    let errorGoal = slider.value;
    maxTestingErrorGoalElem.innerHTML = errorGoal;
    resetTrainingStatus();
}


const doDoodle = () => {
    doClearCanvas();
}

const doGuess = () => {
    guess();
}