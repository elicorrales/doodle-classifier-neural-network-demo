'use strict';

const fileNamePrefix = './data/training.data/my.';
const fileNameSuffix = '.test.data.1000.images.starting.at.0.bin';
const imgBitmapWidth = 28;
const imgBitmapHeight = 28;
const imgBitmapSize = imgBitmapWidth * imgBitmapHeight;

const numImgsAcross = 10;
const numImgsDown = 10;


function preload() {
    birdsData = loadBytes(fileNamePrefix + 'bird' + fileNameSuffix);
    catsData = loadBytes(fileNamePrefix + 'cat' + fileNameSuffix);
    dogsData = loadBytes(fileNamePrefix + 'dog' + fileNameSuffix);
    flowersData = loadBytes(fileNamePrefix + 'flower' + fileNameSuffix);
    rainbowsData = loadBytes(fileNamePrefix + 'rainbow' + fileNameSuffix);

}

function setup() {
    let canvas = createCanvas(500,500);
    resizeCanvas(imgBitmapWidth*numImgsAcross, imgBitmapHeight*numImgsDown);
    canvas.parent('canvasParent');

    let numBirds = birdsData.bytes.length/imgBitmapSize;
    birdsTrainingData = birdsData.bytes.subarray(0, .8 * numBirds * imgBitmapSize);  // 80% of bird data for training
    birdsTestData = birdsData.bytes.subarray(.8 * numBirds * imgBitmapSize, birdsData.length); // 20% of bird data for testing

    let numCats = catsData.bytes.length/imgBitmapSize;
    catsTrainingData = catsData.bytes.subarray(0, .8 * numCats * imgBitmapSize);  // 80% of cat data for training
    catsTestData = catsData.bytes.subarray(.8 * numCats * imgBitmapSize, catsData.length); // 20% of cats data for testing

    let numDogs = dogsData.bytes.length/imgBitmapSize;
    dogsTrainingData = dogsData.bytes.subarray(0, .8 * numDogs * imgBitmapSize);  // 80% of dog data for training
    dogsTestData = dogsData.bytes.subarray(.8 * numDogs * imgBitmapSize, dogsData.length); // 20% of dogs data for testing

    let numFlowers = flowersData.bytes.length/imgBitmapSize;
    flowersTrainingData = flowersData.bytes.subarray(0, .8 * numFlowers * imgBitmapSize);  // 80% of flower data for training
    flowersTestData = flowersData.bytes.subarray(.8 * numFlowers * imgBitmapSize, flowersData.length); // 20% of flower data for testing

    let numRainbows = rainbowsData.bytes.length/imgBitmapSize;
    rainbowsTrainingData = rainbowsData.bytes.subarray(0, .8 * numRainbows * imgBitmapSize);  // 80% of flower data for training
    rainbowsTestData = rainbowsData.bytes.subarray(.8 * numRainbows * imgBitmapSize, flowersData.length); // 20% of flower data for testing
}


function draw() {
    drawTrainingOrTestShapesDataOnCanvas();
}
