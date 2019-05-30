'use strict';

function preload() {
    preloadTrainImagesFiles();
}

function setup() {

    let canvas = createCanvas(500,500);
    resizeCanvas(imgBitmapWidth*numImgsAcross, imgBitmapHeight*numImgsDown);
    canvas.parent('canvasParent');

    setupTrainingTestingImagesAndDataArrays();
    setupTrainingAndTestingData();
}


function draw() {
    drawTrainingOrTestImagesOnCanvas();
    if (doTrain) train();
}
