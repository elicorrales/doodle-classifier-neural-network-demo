'use strict';


const fileNamePrefix = './data/training.data/my.';
const fileNameSuffix = '.test.data.1000.images.starting.at.0.bin';
const imgBitmapWidth = 28;
const imgBitmapHeight = 28;
const imgBitmapSize = imgBitmapWidth * imgBitmapHeight;

const numImgsAcross = 10;
const numImgsDown = 10;

let modeShowTrainingTestImagesOnCanvas = false;

//////////////////////////////////////////////////////////////////////////////////////
// raw images training + test) from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsImages;
let catsImages;
let dogsImages;
let flowersImages;
let rainbowsImages;

//////////////////////////////////////////////////////////////////////////////////////
// raw training images portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTrainingImages;
let catsTrainingImages;
let dogsTrainingImages;
let flowersTrainingImages;
let rainbowsTrainingImages;

//////////////////////////////////////////////////////////////////////////////////////
// raw test images portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTestImages;
let catsTestImages;
let dogsTestImages;
let flowersTestImages;
let rainbowsTestImages;


//////////////////////////////////////////////////////////////////////////////////////
// training data
//////////////////////////////////////////////////////////////////////////////////////
let birdsTrainingData;
let catsTrainingData;
let dogsTrainingData;
let flowersTrainingData;
let rainbowsTrainingData;

//////////////////////////////////////////////////////////////////////////////////////
// test data
//////////////////////////////////////////////////////////////////////////////////////
let birdsTestData;
let catsTestData;
let dogsTestData;
let flowersTestData;
let rainbowsTestData;


let currShapesTrainingImagesToShow;
let invertTrainingImagesAndCanvasColoring = false;
let toggleTrainingVsTesting = false;
let currWhichShapeNameToShow;

const preloadTrainImagesFiles = () => {
    birdsImages = loadBytes(fileNamePrefix + 'bird' + fileNameSuffix);
    catsImages = loadBytes(fileNamePrefix + 'cat' + fileNameSuffix);
    dogsImages = loadBytes(fileNamePrefix + 'dog' + fileNameSuffix);
    flowersImages = loadBytes(fileNamePrefix + 'flower' + fileNameSuffix);
    rainbowsImages = loadBytes(fileNamePrefix + 'rainbow' + fileNameSuffix);
}

const convertImagesToTrainingOrTestingData = (images) => {
    let inputData = [];
    for (let i=0; i<images.length; i+=imgBitmapSize) {
        let dataObject = {};
        dataObject.inputs = images.subarray(i , i + imgBitmapSize); //get 1 image as inputs
        inputData.push(dataObject);
    } 
    return inputData;
}

const setupTrainingAndTestingData = () => {
    birdsTrainingData = convertImagesToTrainingOrTestingData(birdsTrainingImages);
    birdsTestData = convertImagesToTrainingOrTestingData(birdsTestImages);
    catsTrainingData = convertImagesToTrainingOrTestingData(catsTrainingImages);
    catsTestData = convertImagesToTrainingOrTestingData(catsTestImages);
    dogsTrainingData = convertImagesToTrainingOrTestingData(dogsTrainingImages);
    dogsTestData = convertImagesToTrainingOrTestingData(dogsTestImages);
    flowersTrainingData = convertImagesToTrainingOrTestingData(flowersTrainingImages);
    flowersTestData = convertImagesToTrainingOrTestingData(flowersTestImages);
    rainbowsTrainingData = convertImagesToTrainingOrTestingData(rainbowsTrainingImages);
    rainbowsTestData = convertImagesToTrainingOrTestingData(rainbowsTestImages);
}

const setupTrainingTestingImagesAndDataArrays = () => {

    let numBirds = birdsImages.bytes.length/imgBitmapSize;
    birdsTrainingImages = birdsImages.bytes.subarray(0, .8 * numBirds * imgBitmapSize);  // 80% of bird data for training
    birdsTestImages = birdsImages.bytes.subarray(.8 * numBirds * imgBitmapSize, birdsImages.length); // 20% of bird data for testing

    let numCats = catsImages.bytes.length/imgBitmapSize;
    catsTrainingImages = catsImages.bytes.subarray(0, .8 * numCats * imgBitmapSize);  // 80% of cat data for training
    catsTestImages = catsImages.bytes.subarray(.8 * numCats * imgBitmapSize, catsImages.length); // 20% of cats data for testing

    let numDogs = dogsImages.bytes.length/imgBitmapSize;
    dogsTrainingImages = dogsImages.bytes.subarray(0, .8 * numDogs * imgBitmapSize);  // 80% of dog data for training
    dogsTestImages = dogsImages.bytes.subarray(.8 * numDogs * imgBitmapSize, dogsImages.length); // 20% of dogs data for testing

    let numFlowers = flowersImages.bytes.length/imgBitmapSize;
    flowersTrainingImages = flowersImages.bytes.subarray(0, .8 * numFlowers * imgBitmapSize);  // 80% of flower data for training
    flowersTestImages = flowersImages.bytes.subarray(.8 * numFlowers * imgBitmapSize, flowersImages.length); // 20% of flower data for testing

    let numRainbows = rainbowsImages.bytes.length/imgBitmapSize;
    rainbowsTrainingImages = rainbowsImages.bytes.subarray(0, .8 * numRainbows * imgBitmapSize);  // 80% of flower data for training
    rainbowsTestImages = rainbowsImages.bytes.subarray(.8 * numRainbows * imgBitmapSize, flowersImages.length); // 20% of flower data for testing
}


const drawImgSet = (imgArray) => {
    let numImgs = imgArray.length/imgBitmapSize;
    let imgIdx = 0;
    for (let imgDownIdx=0; imgDownIdx<numImgsDown; imgDownIdx++) {
        if (imgIdx >= numImgs) {
            break;
        }
        for (let imgAcrossIdx=0; imgAcrossIdx<numImgsAcross; imgAcrossIdx++) {
            if (imgIdx >= numImgs) {
                break;
            }
            let img = createImage(imgBitmapWidth, imgBitmapHeight);
            img.loadPixels();
            let startImgArrIdx = imgIdx*imgBitmapSize;
            let endImgArrIdx = startImgArrIdx + imgBitmapSize;
            let imgSubArr = imgArray.slice(startImgArrIdx, endImgArrIdx);
            if (imgSubArr.length !== img.pixels.length/4) {
                throw 'Error in arrays lengths';
            }
            for (let p=0,a=0; p<img.pixels.length, a<imgSubArr.length; p+=4,a++) {

                let value = invertTrainingImagesAndCanvasColoring ? 255-imgSubArr[a] : imgSubArr[a];
                img.pixels[p] = value;
                img.pixels[p+1] = value;
                img.pixels[p+2] = value;
                img.pixels[p+3] = 255;
            }
            img.updatePixels();
            image(img, imgBitmapWidth*imgAcrossIdx, imgBitmapHeight*imgDownIdx);
            imgIdx++;
        }
    }


}

const doShowWhichTrainingOrTestImages = (whichShapeNameToShow) => {

    modeShowTrainingTestImagesOnCanvas = true;
    doTrain = false;

    // this normally called from UI button, but can also be called when
    // switching between test and training... thus there wont be a param
    // passed in, because we're not switching which shape category (dogs, cats,etc) to show,
    // just toggling test or training.
    // if a param IS passed, it's cuz we're switching categories
    if (whichShapeNameToShow!==undefined) { currWhichShapeNameToShow = whichShapeNameToShow; }
    else { whichShapeNameToShow = currWhichShapeNameToShow; }

    switch (whichShapeNameToShow) {
        case 'birds':
                    currShapesTrainingImagesToShow = toggleTrainingVsTesting? birdsTrainingImages : birdsTestImages;
                    break;
        case 'cats':
                    currShapesTrainingImagesToShow = toggleTrainingVsTesting? catsTrainingImages : catsTestImages;
                    break;
        case 'dogs':
                    currShapesTrainingImagesToShow = toggleTrainingVsTesting? dogsTrainingImages : dogsTestImages;
                    break;
        case 'flowers':
                    currShapesTrainingImagesToShow = toggleTrainingVsTesting? flowersTrainingImages : flowersTestImages;
                    break;
        case 'rainbows':
                    currShapesTrainingImagesToShow = toggleTrainingVsTesting? rainbowsTrainingImages : rainbowsTestImages;
                    break;
        default:
                    currShapesTrainingImagesToShow = undefined;
                    break;
    }
  
}

const doInvert = () => {

    modeShowTrainingTestImagesOnCanvas = true;
    doTrain = false;

    invertTrainingImagesAndCanvasColoring = invertTrainingImagesAndCanvasColoring ? false : true;
}

const doToggleTrainingVsTestingImages = (obj) => {

    modeShowTrainingTestImagesOnCanvas = true;
    doTrain = false;

    toggleTrainingVsTesting = toggleTrainingVsTesting ? false : true;

    if (toggleTrainingVsTesting) {
        obj.className = 'btn btn-warning';
        obj.innerHTML = 'Show Trainnig Images';
    } else {
        obj.className = 'btn btn-info';
        obj.innerHTML = 'Show Test Images';
    }
    doShowWhichTrainingOrTestImages();
}

const drawTrainingOrTestImagesOnCanvas = () => {

    background(invertTrainingImagesAndCanvasColoring ? 255 : 0);
    if (currShapesTrainingImagesToShow!==undefined) {
        drawImgSet(currShapesTrainingImagesToShow);
    }
}