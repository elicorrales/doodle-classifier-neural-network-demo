'use strict';


let currentTrainingData; //a map that can contain all arrays of 'birds', 'cats', etc..
// the 'birds', 'cats', etc are the keys to each inner object.
// each inner object is itself an array of objects.
let currentTrainingDataIsAllTrainedTrackingArray;
let currentTrainingDataErrorTrackingArray;

let currentTestData;


let toggleUseTrainingOrTestingData = true;
let useBirdsTrainingData = false;
let useCatsTrainingData = false;
let useDogsTrainingData = false;
let useFlowersTrainingData = false;
let useRainbowsTrainingData = false;

const removeUnSelectedDataFromCurrentEitherTrainingOrTest = (whichDataName) => {

    if (currentTrainingData === undefined) {
        return;
    }
    delete currentTrainingData[whichDataName];
    delete currentTestData[whichDataName];
}

const updateCurrentTrainingData = () => {

    //numTrainingCyclesBeforeTrained = 0;
 
    if (currentTrainingData === undefined) {
        currentTrainingData = {};
        currentTestData = {};
    }

    let numOutputs = 0;

    currentTrainingDataIsAllTrainedTrackingArray = [];
    currentTrainingDataErrorTrackingArray = [];

    if (useBirdsTrainingData) {
        currentTrainingData['birds'] = birdsTrainingData;
        currentTestData['birds'] = birdsTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useCatsTrainingData) {
        currentTrainingData['cats'] = catsTrainingData;
        currentTestData['cats'] = catsTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useDogsTrainingData) {
        currentTrainingData['dogs'] = dogsTrainingData;
        currentTestData['dogs'] = dogsTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useFlowersTrainingData) {
        currentTrainingData['flowers'] = flowersTrainingData;
        currentTestData['flowers'] = flowersTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useRainbowsTrainingData) {
        currentTrainingData['rainbows'] = rainbowsTrainingData;
        currentTestData['rainbows'] = rainbowsTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }

    let theHighOutputIdx = 0;
    for (let key in currentTrainingData) { //for each category....  ('birds','cats'...)

        //this creates an output array that should have the number of outputs as there are selected categories to train (or test).
        //so, if we selected 'birds', and 'cats', the  output array should contain 2 elements.
        let outputs = [];
        for (let i=0; i<numOutputs; i++) { outputs.push(0);}
        let trainingDataObjects = currentTrainingData[key];
        let testDataObjects = currentTestData[key];

        // now we have to set the '1' only in the output array position that matches the category.
        // example:  if 'birds' is position zero of the outputs, and 'cats' is position one, then the output array copy that we're going to
        // save to EACH bird is [1,0], but for EACH cat, the output array will be [0,1].
        for (let i=0; i<trainingDataObjects.length; i++) { // this is the actual number of inputs of each type (i.e., 800 birds);
            let dataObject = trainingDataObjects[i];
            outputs[theHighOutputIdx] = 1;
            dataObject.outputs = outputs;
        }

        for (let i=0; i<testDataObjects.length; i++) { // this is the actual number of inputs of each type (i.e., 800 birds);
            let dataObject = testDataObjects[i];
            outputs[theHighOutputIdx] = 1;
            dataObject.outputs = outputs;
        }

        theHighOutputIdx++;// we're moving on to next category (like from 'birds' to 'cats').
    }
}

const updateCurrentTestData = () => {

}

const updateCurrentDataEitherTrainingOrTest = () => {

    resetTrainingStatus();

    if (toggleUseTrainingOrTestingData) {
        updateCurrentTrainingData();
    } else {
        updateCurrentTestData();
    }

    allTrained = false;
}

const doToggleUseTrainingOrTestingData = (obj) => {

    clearMessages();

    toggleUseTrainingOrTestingData = toggleUseTrainingOrTestingData ? false : true;

    if (toggleUseTrainingOrTestingData) {
        obj.className = 'btn btn-warning';
        obj.innerHTML = 'Using Trainnig Data';
    } else {
        obj.className = 'btn btn-info';
        obj.innerHTML = 'Using Test Data';
    }
   
    updateCurrentDataEitherTrainingOrTest();
}

const doUseThisTrainingData = (whichDataName, button) =>{

    clearMessages();

    let btnIsPressed;
    switch (whichDataName) {
        case 'birds':
                    useBirdsTrainingData = useBirdsTrainingData? false : true;
                    btnIsPressed = useBirdsTrainingData;
                    break;
        case 'cats':
                    useCatsTrainingData = useCatsTrainingData? false : true;
                    btnIsPressed = useCatsTrainingData;
                    break;
        case 'dogs':
                    useDogsTrainingData = useDogsTrainingData? false : true;
                    btnIsPressed = useDogsTrainingData;
                    break;
        case 'flowers':
                    useFlowersTrainingData = useFlowersTrainingData? false : true;
                    btnIsPressed = useFlowersTrainingData;
                    break;
        case 'rainbows':
                    useRainbowsTrainingData = useRainbowsTrainingData? false : true;
                    btnIsPressed = useRainbowsTrainingData;
                    break;
        default:
                    throw 'Unknown type in \'doUseThisTrainingData()\'';
                    break;
    }
  
    if (!btnIsPressed) {
        removeUnSelectedDataFromCurrentEitherTrainingOrTest(whichDataName);
    }

    button.className = btnIsPressed? 'btn btn-primary' : 'btn btn-default';
    updateCurrentDataEitherTrainingOrTest();
}
