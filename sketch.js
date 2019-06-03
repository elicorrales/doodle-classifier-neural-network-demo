'use strict';

function preload() {
    preloadTrainImagesFiles();
}

function setup() {

    let canvas = createCanvas(500,500);
    resizeCanvas(imgBitmapWidth*numImgsAcross, imgBitmapHeight*numImgsDown);
    canvas.parent('canvasParent');
    background(255);
    setupTrainingTestingImagesAndDataArrays();
    setupTrainingAndTestingData();
}


function draw() {
    if (modeShowTrainingTestImagesOnCanvas) {
        drawTrainingOrTestImagesOnCanvas();
    } else {
        if (doTrain) {
            train();
        }
        if (doTest && isReadyToTest) {
            test();
        }
        if (allTrained) {
            showMessages('success','All Trained');
        }
    }
}
