
let toggleModifiedTrainingData = false;

const test = () => {
    clearMessages();

    if (currentTrainingData === undefined) {
        showMessages('danger', 'There is NO Training/Test Data');
        return;
    }

    if (neuralNetwork === undefined) {
        showMessages('danger', 'No Neural Network');
        return;
    }

    let whichDataToUseForTesting;

    if (toggleUseTrainingOrTestingData) {
        console.log('Testing with Training Data...');
        whichDataToUseForTesting = currentTrainingData;
    } else {
        console.log('Testing with Testing Data...');
        whichDataToUseForTesting = currentTestData;
    }

    let categoryErrorCount = 0;
    let totalErrorCount = 0;
    for (let i = 0; i < whichDataToUseForTesting.length; i++) {
        let inputs = whichDataToUseForTesting[i].inputs.slice(0);
        categoryErrorCount = 0;
        if (toggleModifiedTrainingData) {
            for (let j=0; j<inputs.length; j++) {
                inputs[j] = 1;
            }
        }
        let outputs = neuralNetwork.predict(inputs);
        let category = whichDataToUseForTesting[i].label;
        if (!isAllErrorsLessThanMin(0.2, whichDataToUseForTesting[i].outputs, outputs)) {
            categoryErrorCount++;
            totalErrorCount += categoryErrorCount;
        }
    }
    console.log('Total Errors : ' + totalErrorCount);
}

const doToggleModifiedTrainingData = (button) => {
    toggleModifiedTrainingData = toggleModifiedTrainingData ? false : true;
    if (toggleModifiedTrainingData) {
        button.className = 'btn btn-warning';
        button.innerHTML = 'Modified';
    } else {
        button.className = 'btn btn-info';
        button.innerHTML = 'Original';
    }
}