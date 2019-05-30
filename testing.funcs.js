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
        whichDataToUseForTesting = currentTrainingData;
    } else {
        whichDataToUseForTesting = currentTestData;
    }

    let categoryErrorCount = 0;
    let totalErrorCount = 0;
    for (let key in whichDataToUseForTesting) {
        categoryErrorCount = 0;
        if (whichDataToUseForTesting.hasOwnProperty(key)) {
            console.log('testing ' + key);
            let testDataArrays = whichDataToUseForTesting[key];
            testDataArrays.forEach( testData => {
                let outputs = neuralNetwork.predict(testData.inputs);
                if (!isAllErrorsLessThanMin(testData.outputs, outputs)) {
                    categoryErrorCount++;
                }
            });
            console.log('Errors for ' + key + ': ' + categoryErrorCount);
        }
        totalErrorCount += categoryErrorCount;
        console.log('Total Errors : ' + totalErrorCount);
    }
}