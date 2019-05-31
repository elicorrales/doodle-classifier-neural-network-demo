
let toggleModifiedTestingData = false;

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

    return isGoodResult;
}




/*********************************************************************************
 * training data has been collected into a single large array containing all
 * classes ('birds', 'cats', 'flowers', etc), AND shuffled.
 * See code which loads the data.
 */
const testWithTrainingData = () => {
    clearMessages();
    if (currentTestData === undefined) {
        showMessages('danger', 'There is NO Test Data');
        return;
    }
    if (neuralNetwork === undefined) {
        showMessages('danger', 'No Neural Network');
        return;
    }
    let totalErrorCount = 0;
    for (let i = 0; i < currentTrainingData.length; i++) {
        let category = currentTrainingData[i].label;
        let expectedOutputs = currentTrainingData[i].outputs;
        let inputs = currentTrainingData[i].inputs.slice(0);
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
    }
    console.log('Total Errors : ' + totalErrorCount);
}

/*********************************************************************************
 * test data may or MAY NOT have been collected into a single large array containing all
 * classes ('birds', 'cats', 'flowers', etc), AND shuffled.
 * See code which loads the data.
 */
/*
const testWithTestData = () => {

    clearMessages();

    if (currentTestData === undefined) {
        showMessages('danger', 'There is NO Test Data');
        return;
    }

    if (neuralNetwork === undefined) {
        showMessages('danger', 'No Neural Network');
        return;
    }

    let categoryErrorCount = 0;
    let totalErrorCount = 0;
    for (let c = 0; c < currentTestData.length; c++) {
        let category = currentTestData[i].label;
        let inputs = currentTestData[c].inputs.slice(0);
        for (let i = 0; i < inputs.length; i++) {
            categoryErrorCount = 0;
            if (toggleModifiedTestingData) {
                for (let j = 0; j < inputs.length; j++) {
                    inputs[j] = 1;
                }
            }
            let outputs = neuralNetwork.predict(inputs);
            let category = inputs.label;
            if (!isAllErrorsLessThanMin(0.2, inputs.outputs, outputs)) {
                categoryErrorCount++;
                totalErrorCount += categoryErrorCount;
            }
        }
    }
    console.log('Total Errors : ' + totalErrorCount);
}
*/

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

