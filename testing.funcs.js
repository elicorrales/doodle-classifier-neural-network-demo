let actualPercentCorrect = 0;
let toggleModifiedTestingData = false;
let totalTestErrorDelta = 0;

const findMaxFloatValueInArray = (outputs) => {
    if (outputs === undefined) {
        throw 'Outputs undefined';
    }
    let max = 0;
    for (let i=0; i<outputs.length; i++) {
        if (max < outputs[i]) max = outputs[i];
    }
    return max;
}
const findIndexOfMaxOutput = (outputs) => {
    if (outputs === undefined) {
        throw 'Outputs undefined';
    }
    let max = findMaxFloatValueInArray(outputs);
    return outputs.indexOf(max);
}


/*********************************************************************************
 * training data has been collected into a single large array containing all
 * classes ('birds', 'cats', 'flowers', etc), AND shuffled.
 * See code which loads the data.
 */
const test = () => {

    let useWhichDataToTest;

    if (toggleUseTrainingOrTestingData) {
        useWhichDataToTest = currentTrainingData;
    } else {
        useWhichDataToTest = currentTestData;
    }

    if (useWhichDataToTest === undefined) {
        throw 'There is NO Test Data';
    }
    if (neuralNetwork === undefined) {
        throw 'No Neural Network';
    }

    let totalNumSamples = 0;
    let totalErrorCount = 0;
    for (let i = 0; i < useWhichDataToTest.length; i++) {
        let category = useWhichDataToTest[i].label;
        let expectedOutputs = useWhichDataToTest[i].outputs;
        let inputs = useWhichDataToTest[i].inputs.slice(0);
        if (toggleModifiedTestingData) {
            for (let j = 0; j < inputs.length; j++) {
                inputs[j] = 1;
            }
        }
        totalNumSamples++;
        let outputs = neuralNetwork.predict(inputs);
        let categoryGuessed = findIndexOfMaxOutput(outputs);
        let categoryExpected = findIndexOfMaxOutput(expectedOutputs);
        if (categoryGuessed != categoryExpected) {
            totalErrorCount ++;
        }
        //showMessages('info', 'Testing  #' + i  + ', ' + category + ', errors: ' +  totalErrorCount + ' , ' + totalTestErrorDelta + '...');
    }
    showMessages('info','Test Results: Errors : ' + totalErrorCount + ', Samples: ' + totalNumSamples + ', ' + Math.round(((totalNumSamples-totalErrorCount)/totalNumSamples)*100) + '% Correct');
    console.log('Test Results: Errors : ' + totalErrorCount + ', Samples: ' + totalNumSamples + ', ' + Math.round(((totalNumSamples-totalErrorCount)/totalNumSamples)*100) + '% Correct');
    actualPercentCorrect = Math.round(((totalNumSamples-totalErrorCount)/totalNumSamples)*100);
    allTrained = actualPercentCorrect >= minRequiredTestPercentCorrectSliderElem.value;
    isReadyToTest = false;
}


const doToggleModifiedTestingData = (button) => {
    doClearCanvas();
    clearMessages();
    resetTrainingStatus();
    
    toggleModifiedTestingData = toggleModifiedTestingData ? false : true;
    if (toggleModifiedTestingData) {
        button.className = 'btn btn-warning';
        button.innerHTML = 'Modified';
    } else {
        button.className = 'btn btn-info';
        button.innerHTML = 'Original';
    }
}

