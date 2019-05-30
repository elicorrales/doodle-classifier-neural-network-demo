'use strict';


let currentTrainingData; //a map that can contain all arrays of 'birds', 'cats', etc..
// the 'birds', 'cats', etc are the keys to each inner object.
// each inner object is itself an array of objects.

let currentTestData;


let toggleUseTrainingOrTestingData = false;
let useBirdsTrainingData = false;
let useCatsTrainingData = false;
let useDogsTrainingData = false;
let useFlowersTrainingData = false;
let useRainbowsTrainingData = false;

const updateCurrentTrainingData = () => {

    if (currentTrainingData === undefined) {
        currentTrainingData = {};
    }

    let outputs = [];

    if (useBirdsTrainingData) {
        currentTrainingData['birds'] = birdsTrainingData;
        outputs.push(1);
    }
    if (useCatsTrainingData) {
        currentTrainingData['cats'] = catsTrainingData;
        outputs.push(1);
    }
    if (useDogsTrainingData) {
        currentTrainingData['dogs'] = dogsTrainingData;
        outputs.push(1);
    }
    if (useFlowersTrainingData) {
        currentTrainingData['flowers'] = flowersTrainingData;
        outputs.push(1);
    }
    if (useRainbowsTrainingData) {
        currentTrainingData['rainbows'] = rainbowsTrainingData;
        outputs.push(1);
    }

    for (let key in currentTrainingData) {
        let categoryObjects = currentTrainingData[key];
        for (let i=0; i<categoryObjects.length; i++) {
            let dataObject = categoryObjects[i];
            dataObject.outputs = outputs;
        }
    }
}

const updateCurrentTestData = () => {

}

const updateCurrentDataEitherTrainingOrTest = () => {

    if (toggleUseTrainingOrTestingData) {
        updateCurrentTrainingData();
    } else {
        updateCurrentTestData();
    }

    allTrained = false;
}

const doToggleUseTrainingOrTestingData = (obj) => {

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

const doUseThisTrainingData = (whichDataName, obj) =>{

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
  

    obj.className = btnIsPressed? 'btn btn-primary' : 'btn btn-default';
    updateCurrentDataEitherTrainingOrTest();
}
