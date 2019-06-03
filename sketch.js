'use strict';

function preload() {
    preloadTrainImagesFiles();
}

function setup() {

    //imgBitmapWidth = 28;
    //imgBitmapHeight = 28;
    //28 * canvas width multiplier
    //28 * canvas height multiplier
    //28 * 10 = 280
    //28 = 20 = 560
    let canvas = createCanvas(560,560);
    //resizeCanvas(imgBitmapWidth*numImgsAcross, imgBitmapHeight*numImgsDown);
    canvas.parent('canvasParent');
    background(invertTrainingImagesAndCanvasColoring ? 255 : 0);
    //background(255);
    setupTrainingTestingImagesAndDataArrays();
    setupTrainingAndTestingData();
}


function draw() {
    if (modeShowTrainingTestImagesOnCanvas) {
        drawTrainingOrTestImagesOnCanvas();
    } else {
        placeBackAnySavedImageAlreadyOnCanvas();
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
