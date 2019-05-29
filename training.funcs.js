'use strict';

const train = () => {

/*
    if (currentTrainingData === undefined || currentTrainingData.length < 1) {
        showMessages('danger','No Training Data Selected Or There is no data');
        return;
    }

    if (thereWasACriticalError) return;
    if (timeRanOut) return;
*/
    try {
/*
        //background(0);

        if (allTrained) {
            if (!showedAllTrained) {
                showMessages('success', 'All Trained');
                showedAllTrained = true;
            }
            return;
        }
*/

/*
        // depending on how the network was initialized,
        // it may NOT train, so we just throw it away
        // and recreate the network.
        let currentTime = new Date().getTime();
        let deltaTrainingTime = (currentTime - trainingStartTime) / 1000;
        let trainingWait = parseInt(trainingWaitSliderElem.value);
        if (!allTrained) showMessages('info','Training ....' + deltaTrainingTime);
        if (deltaTrainingTime > trainingWait && !allTrained) {
            timeRanOut = true;
            showMessages('danger','Time Ran Out');
            if (autoRelearn) {
                doCreateNetwork('danger', 'Time Ran Out -  Retraining...');
            }
        }
*/
        if (neuralNetwork !== undefined && currTrainingData !== undefined && currTrainingData.length > 0) {

            let numOutputs = currentTrainingData[0].outputs.length;

            if (!allTrained) {
                for (let i = 0; i < 50; i++) {
                    let data = random(currentTrainingData);
                    let errors = neuralNetwork.predict(data.inputs);
                    allTrained = isAllTrained(data.outputs, errors);
                    output_errors = neuralNetwork.train(data.inputs, data.outputs);
                }
            }

            neuralNetwork.setLearningRate(learningRateSliderElem.value);

            background(0);
            let resolution =  10;//numOutputs*4;
            let cols = width / resolution;
            let rows = height / resolution;
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                        noStroke();
                        let outputs = neuralNetwork.predict(random(currentTrainingData).inputs);
                        let whichColor = 0;
            let red = 0;
            let green = 0;
            let blue = 0;
                        outputs.forEach( o => {
                            if (whichColor>2) whichColor = 0;
                            switch (whichColor) {
                                case 0:
                                    red += 100*(o/(1-o));
                                    break;
                                case 1:
                                    blue += 100*(o/(1-o));
                                    break;
                                case 2:
                                    green += 100*(o/(1-o));
                                    break;
                            }
                            whichColor++;
                        });
                        fill(red, blue, green);
                        rect(i * resolution, j * resolution, resolution, resolution);
                }
            }
        }
        
    } catch (error) {
        console.log(error);
        showMessages('danger', error);
        thereWasACriticalError = true;
    }

}