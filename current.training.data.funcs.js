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
let useHousesTrainingData = false;
let useBooksTrainingData = false;
let useBananasTrainingData = false;

const removeAllAndStartOver = () => {
    currentTrainingData = undefined;
    currentTestData = undefined;
}

const updateCurrentData = () => {

    //numTrainingCyclesBeforeTrained = 0;
 
    currentTrainingData = {};
    currentTestData = {};

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
    if (useHousesTrainingData) {
        currentTrainingData['houses'] = housesTrainingData;
        currentTestData['houses'] = housesTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useBooksTrainingData) {
        currentTrainingData['books'] = booksTrainingData;
        currentTestData['books'] = booksTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }
    if (useBananasTrainingData) {
        currentTrainingData['bananas'] = bananasTrainingData;
        currentTestData['bananas'] = bananasTestData;
        numOutputs++;
        currentTrainingDataIsAllTrainedTrackingArray.push(false);
        currentTrainingDataErrorTrackingArray.push(1);
    }


    if (numOutputs === 0) {
        showMessages('danger','No Training / Test Categories Selected');
        currentTrainingData = undefined;
        currentTestData = undefined;
        return;
    }

    let theHighOutputIdx = 0;
    for (let key in currentTrainingData) { //for each category....  ('birds','cats'...)

        if (!currentTrainingData.hasOwnProperty(key)) {
            throw 'there was an error attempting to create training/testing data arrays #1';
        }

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


    //now let's simplify the above from an object (map) with multiple category arrays.. to just one big array, AND all mixed.(shuffed)
    // the purpose of all the above was to dynamically on the fly generate the correct number of output positions for each category,
    // all depending on what categories are selected or not.
    let tempTrainingData = [];
    for (let key in currentTrainingData) { //for each category....  ('birds','cats'...)
        if (!currentTrainingData.hasOwnProperty(key)) {
            throw 'there was an error attempting to create training/testing data arrays #2';
        }
        let temp = currentTrainingData[key];
        tempTrainingData = tempTrainingData.concat(temp);
    }
    currentTrainingData = tempTrainingData;

    let tempTestData = [];
    for (let key in currentTestData) { //for each category....  ('birds','cats'...)
        if (!currentTestData.hasOwnProperty(key)) {
            throw 'there was an error attempting to create training/testing data arrays #2';
        }
        let temp = currentTestData[key];
        tempTestData = tempTestData.concat(temp)
    }
    currentTestData = tempTestData;

    //now we want to shuffle so as to randomize for training and testing
    shuffle(currentTrainingData,true);
    shuffle(currentTestData,true);

}



const doToggleUseTrainingOrTestingData = (button) => {

    clearMessages();
    resetTrainingStatus();

    toggleUseTrainingOrTestingData = toggleUseTrainingOrTestingData ? false : true;

    if (toggleUseTrainingOrTestingData) {
        button.className = 'btn btn-warning';
        button.innerHTML = 'Using Trainnig Data';
    } else {
        button.className = 'btn btn-info';
        button.innerHTML = 'Using Test Data';
    }
   
    updateCurrentData();
}

const doUseThisTrainingData = (whichDataName, button) =>{

    clearMessages();
    resetTrainingStatus();

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
        case 'houses':
                    useHousesTrainingData = useHousesTrainingData? false : true;
                    btnIsPressed = useHousesTrainingData;
                    break;
        case 'books':
                    useBooksTrainingData = useBooksTrainingData? false : true;
                    btnIsPressed = useBooksTrainingData;
                    break;
        case 'bananas':
                    useBananasTrainingData = useBananasTrainingData? false : true;
                    btnIsPressed = useBananasTrainingData;
                    break;
        default:
                    throw 'Unknown type in \'doUseThisTrainingData()\'';
                    break;
    }
  
    if (!btnIsPressed) {
        removeAllAndStartOver();
    }

    button.className = btnIsPressed? 'btn btn-primary' : 'btn btn-default';
    updateCurrentData();
}
