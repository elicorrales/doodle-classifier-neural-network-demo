'use strict';

let toggleUseTrainingOrTestingData = false;

let currRawInputImagesArray;

let birdsTrainingData;
let catsTrainingData;
let dogsTrainingData;
let flowersTrainingData;
let rainbowsTrainingData;

let birdsTestData;
let catsTestData;
let dogsTestData;
let flowersTestData;
let rainbowsTestData;

let currentTrainingData;

const doToggleUseTrainingOrTestingData = (obj) => {

    toggleUseTrainingOrTestingData = toggleUseTrainingOrTestingData ? false : true;

    if (toggleUseTrainingOrTestingData) {
        obj.className = 'btn btn-warning';
        obj.innerHTML = 'Using Trainnig Data';
    } else {
        obj.className = 'btn btn-info';
        obj.innerHTML = 'Using Test Data';
    }
}

const doUseThishTrainingData = (whichDataName) =>{

}

/*************************************************************
 * The incoming/input data from files only has the inputs
 * for the neural network, but we need the outputs, too.
 * AND, it's only the raw images. We need to turn those
 * into the inputs.
 * The number of outputs (classifications) depends on the
 * number of input shape types that we want to train/use
 * with the network.
 * So, we will dynamically add the correct number of outputs
 * and also what the state of each output would be.
 ************************************************************/
const convertCurrentShapesDataIntoDataUsefulForTraining = () => {
    currRawInputImagesArray = kkkkkkkkkkk
    {
        inputs:
        outputs:
    }
}