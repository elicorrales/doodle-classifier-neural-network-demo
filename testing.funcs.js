
let toggleModifiedTestingData = false;
let totalTestErrorDelta = 0;
const isAllDifferencesLessThanMin = (minErr, expected, outputs) => {
    if (expected === undefined || outputs === undefined || expected.length !== outputs.length) {
        throw 'danger', 'Outputs Issue during testing - see \'isAllDifferencesLessThanMin()\'';
    }

    let sumOfDelta = 0;
    for (let i=0; i< expected.length; i++) {
        let delta = Math.abs(expected[i] - outputs[i]);
        sumOfDelta += delta;
    }
    let isGoodResult =  sumOfDelta < minErr*expected.length;
    totalTestErrorDelta = sumOfDelta;

    return isGoodResult;
}




/*********************************************************************************
 * training data has been collected into a single large array containing all
 * classes ('birds', 'cats', 'flowers', etc), AND shuffled.
 * See code which loads the data.
 */
const test = () => {

    clearMessages();

    let useWhichDataToTest;

    if (toggleUseTrainingOrTestingData) {
        useWhichDataToTest = currentTrainingData;
    } else {
        useWhichDataToTest = currentTestData;
    }

    if (useWhichDataToTest === undefined) {
        showMessages('danger', 'There is NO Test Data');
        return;
    }
    if (neuralNetwork === undefined) {
        showMessages('danger', 'No Neural Network');
        return;
    }

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
        let outputs = neuralNetwork.predict(inputs);
        let maxTestingErrorGoal = maxTestingErrorGoalSliderElem.value;
        if (!isAllDifferencesLessThanMin(maxTestingErrorGoal, expectedOutputs, outputs)) {
            totalErrorCount ++;
        }
        //showMessages('info', 'Testing  #' + i  + ', ' + category + ', errors: ' +  totalErrorCount + ' , ' + totalTestErrorDelta + '...');
    }
    console.log('Total Errors : ' + totalErrorCount);
}


const doToggleModifiedTestingData = (button) => {
    toggleModifiedTestingData = toggleModifiedTestingData ? false : true;
    if (toggleModifiedTestingData) {
        button.className = 'btn btn-warning';
        button.innerHTML = 'Modified';
    } else {
        button.className = 'btn btn-info';
        button.innerHTML = 'Original';
    }
}

