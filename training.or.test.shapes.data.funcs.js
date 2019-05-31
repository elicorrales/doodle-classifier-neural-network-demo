'use strict';


const fileNamePrefix = './data/training.data/my.';
//const fileNamePrefix = './my.';
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
let housesImages;
let booksImages;
let bananasImages;

//////////////////////////////////////////////////////////////////////////////////////
// raw training images portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTrainingImages;
let catsTrainingImages;
let dogsTrainingImages;
let flowersTrainingImages;
let rainbowsTrainingImages;
let housesTrainingImages;
let booksTrainingImages;
let bananasTrainingImages;

let birdsModifiedTrainingImages;
let catsModifiedTrainingImages;
let dogsModifiedTrainingImages;
let flowersModifiedTrainingImages;
let rainbowsModifiedTrainingImages;
let housesModifiedTrainingImages;
let booksModifiedTrainingImages;
let bananasModifiedTrainingImages;


//////////////////////////////////////////////////////////////////////////////////////
// raw test images portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTestImages;
let catsTestImages;
let dogsTestImages;
let flowersTestImages;
let rainbowsTestImages;
let housesTestImages;
let booksTestImages;
let bananasTestImages;


//////////////////////////////////////////////////////////////////////////////////////
// training data
//////////////////////////////////////////////////////////////////////////////////////
let birdsTrainingData;
let catsTrainingData;
let dogsTrainingData;
let flowersTrainingData;
let rainbowsTrainingData;
let housesTrainingData;
let booksTrainingData;
let bananasTrainingData;


//////////////////////////////////////////////////////////////////////////////////////
// test data
//////////////////////////////////////////////////////////////////////////////////////
let birdsTestData;
let catsTestData;
let dogsTestData;
let flowersTestData;
let rainbowsTestData;
let housesTestData;
let booksTestData;
let bananasTestData;


let currShapesTrainingImagesToShow;
let invertTrainingImagesAndCanvasColoring = false;
let toggleTrainingVsTesting = false;
let currWhichShapeNameToShow;
let toggleModifiedTrainingImages = false;

const preloadTrainImagesFiles = () => {
    birdsImages = loadBytes(fileNamePrefix + 'bird' + fileNameSuffix);
    rainbowsImages = loadBytes(fileNamePrefix + 'rainbow' + fileNameSuffix);
    housesImages = loadBytes(fileNamePrefix + 'house' + fileNameSuffix);

    catsImages = loadBytes(fileNamePrefix + 'cat' + fileNameSuffix);
    dogsImages = loadBytes(fileNamePrefix + 'dog' + fileNameSuffix);
    flowersImages = loadBytes(fileNamePrefix + 'flower' + fileNameSuffix);

    booksImages = loadBytes(fileNamePrefix + 'book' + fileNameSuffix);
    bananasImages = loadBytes(fileNamePrefix + 'banana' + fileNameSuffix);
}


const convertImagesToTrainingOrTestingData = (images, label, type) => {
    let inputData = [];
    for (let i = 0; i < images.length; i += imgBitmapSize) {
        let dataObject = {};
        //dataObject.inputs = images.subarray(i, i + imgBitmapSize); //get 1 image as inputs
        let tempInputs = images.slice(i, i + imgBitmapSize); //get 1 image as inputs
        dataObject.inputs = [];
        for (let j=0; j<tempInputs.length; j++) {
            if (tempInputs[j] !== 0) {
                let numerator = tempInputs[j];
                let normalized = numerator/255;
                dataObject.inputs[j] = normalized;
            } else {
                dataObject.inputs[j] = tempInputs[j];
            }
        }
        //dataObject.inputs = images.slice(i, i + imgBitmapSize); //get 1 image as inputs
        dataObject.label = label;
        dataObject.type = type;
        inputData.push(dataObject);
    }
    images = null;
    images = undefined;
    return inputData;
}

const setupTrainingAndTestingData = () => {
    birdsTrainingData = convertImagesToTrainingOrTestingData(birdsTrainingImages, 'birds', 'training');
    birdsTestData = convertImagesToTrainingOrTestingData(birdsTestImages, 'birds', 'test');
    rainbowsTrainingData = convertImagesToTrainingOrTestingData(rainbowsTrainingImages, 'rainbows', 'training');
    rainbowsTestData = convertImagesToTrainingOrTestingData(rainbowsTestImages, 'rainbows', 'test');
    housesTrainingData = convertImagesToTrainingOrTestingData(housesTrainingImages, 'houses', 'training');
    housesTestData = convertImagesToTrainingOrTestingData(housesTestImages, 'houses', 'test');
    
    catsTrainingData = convertImagesToTrainingOrTestingData(catsTrainingImages,'cats','training');
    catsTestData = convertImagesToTrainingOrTestingData(catsTestImages,'cats','test');
    dogsTrainingData = convertImagesToTrainingOrTestingData(dogsTrainingImages,'dogs','training');
    dogsTestData = convertImagesToTrainingOrTestingData(dogsTestImages,'dogs','test');
    flowersTrainingData = convertImagesToTrainingOrTestingData(flowersTrainingImages,'flowers','training');
    flowersTestData = convertImagesToTrainingOrTestingData(flowersTestImages,'flowers','test');
    
    booksTrainingData = convertImagesToTrainingOrTestingData(booksTrainingImages,'books','training');
    booksTestData = convertImagesToTrainingOrTestingData(booksTestImages,'books','test');

    bananasTrainingData = convertImagesToTrainingOrTestingData(bananasTrainingImages,'bananas','training');
    bananasTestData = convertImagesToTrainingOrTestingData(bananasTestImages,'bananas','test');
}

const setupTrainingTestingImagesAndDataArrays = () => {

    let numBirds = birdsImages.bytes.length / imgBitmapSize;
    birdsTrainingImages = birdsImages.bytes.subarray(0, .8 * numBirds * imgBitmapSize);  // 80% of bird data for training
    birdsTestImages = birdsImages.bytes.subarray(.8 * numBirds * imgBitmapSize, birdsImages.length); // 20% of bird data for testing

    let numRainbows = rainbowsImages.bytes.length / imgBitmapSize;
    rainbowsTrainingImages = rainbowsImages.bytes.subarray(0, .8 * numRainbows * imgBitmapSize);  // 80% of rainbows data for training
    rainbowsTestImages = rainbowsImages.bytes.subarray(.8 * numRainbows * imgBitmapSize, rainbowsImages.length); // 20% of rainbows data for testing

    let numHouses = housesImages.bytes.length / imgBitmapSize;
    housesTrainingImages = housesImages.bytes.subarray(0, .8 * numHouses * imgBitmapSize);  // 80% of house data for training
    housesTestImages = housesImages.bytes.subarray(.8 * numHouses * imgBitmapSize, housesImages.length); // 20% of house data for testing
    
    let numCats = catsImages.bytes.length / imgBitmapSize;
    catsTrainingImages = catsImages.bytes.subarray(0, .8 * numCats * imgBitmapSize);  // 80% of cat data for training
    catsTestImages = catsImages.bytes.subarray(.8 * numCats * imgBitmapSize, catsImages.length); // 20% of cats data for testing
    
    let numDogs = dogsImages.bytes.length / imgBitmapSize;
    dogsTrainingImages = dogsImages.bytes.subarray(0, .8 * numDogs * imgBitmapSize);  // 80% of dog data for training
    dogsTestImages = dogsImages.bytes.subarray(.8 * numDogs * imgBitmapSize, dogsImages.length); // 20% of dogs data for testing
    
    let numFlowers = flowersImages.bytes.length / imgBitmapSize;
    flowersTrainingImages = flowersImages.bytes.subarray(0, .8 * numFlowers * imgBitmapSize);  // 80% of flower data for training
    flowersTestImages = flowersImages.bytes.subarray(.8 * numFlowers * imgBitmapSize, flowersImages.length); // 20% of flower data for testing
    
    let numBooks = booksImages.bytes.length / imgBitmapSize;
    booksTrainingImages = booksImages.bytes.subarray(0, .8 * numBooks * imgBitmapSize);  // 80% of books data for training
    booksTestImages = booksImages.bytes.subarray(.8 * numBooks * imgBitmapSize, booksImages.length); // 20% of books data for testing

    let numBananas = bananasImages.bytes.length / imgBitmapSize;
    bananasTrainingImages = bananasImages.bytes.subarray(0, .8 * numBananas * imgBitmapSize);  // 80% of bananas data for training
    bananasTestImages = bananasImages.bytes.subarray(.8 * numBananas * imgBitmapSize, bananasImages.length); // 20% of bananas data for testing
}


const drawImgSet = (imgArray) => {
    let numImgs = imgArray.length / imgBitmapSize;
    let imgIdx = 0;
    for (let imgDownIdx = 0; imgDownIdx < numImgsDown; imgDownIdx++) {
        if (imgIdx >= numImgs) {
            break;
        }
        for (let imgAcrossIdx = 0; imgAcrossIdx < numImgsAcross; imgAcrossIdx++) {
            if (imgIdx >= numImgs) {
                break;
            }
            drawSingleImage(imgIdx, imgArray, imgAcrossIdx, imgDownIdx);
            imgIdx++;
        }
    }

}

const drawSingleImage = (imgIdx, imgArray, imgAcrossIdx, imgDownIdx) => {
    let startImgArrIdx = imgIdx * imgBitmapSize;
    let endImgArrIdx = startImgArrIdx + imgBitmapSize;
    let imgSubArr = imgArray.slice(startImgArrIdx, endImgArrIdx);
    let img = createImage(imgBitmapWidth, imgBitmapHeight);
    img.loadPixels();
    if (imgSubArr.length !== img.pixels.length / 4) {
        throw 'Error in arrays lengths';
    }
    for (let p = 0, a = 0; p < img.pixels.length, a < imgSubArr.length; p += 4, a++) {

        let value = invertTrainingImagesAndCanvasColoring ? 255 - imgSubArr[a] : imgSubArr[a];
        img.pixels[p] = value;
        img.pixels[p + 1] = value;
        img.pixels[p + 2] = value;
        img.pixels[p + 3] = 255;
    }
    img.updatePixels();
    image(img, imgBitmapWidth * imgAcrossIdx, imgBitmapHeight * imgDownIdx);
}


const doShowWhichTrainingOrTestImages = (whichShapeNameToShow) => {

    modeShowTrainingTestImagesOnCanvas = true;
    doTrain = false;

    // this normally called from UI button, but can also be called when
    // switching between test and training... thus there wont be a param
    // passed in, because we're not switching which shape category (dogs, cats,etc) to show,
    // just toggling test or training.
    // if a param IS passed, it's cuz we're switching categories
    if (whichShapeNameToShow !== undefined) { currWhichShapeNameToShow = whichShapeNameToShow; }
    else { whichShapeNameToShow = currWhichShapeNameToShow; }

    switch (whichShapeNameToShow) {
        case 'birds':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? birdsTrainingImages : birdsTestImages;
            break;
        case 'cats':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? catsTrainingImages : catsTestImages;
            break;
        case 'dogs':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? dogsTrainingImages : dogsTestImages;
            break;
        case 'flowers':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? flowersTrainingImages : flowersTestImages;
            break;
        case 'rainbows':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? rainbowsTrainingImages : rainbowsTestImages;
            break;
        case 'houses':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? housesTrainingImages : housesTestImages;
            break;
        case 'books':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? booksTrainingImages : booksTestImages;
            break;
        case 'bananas':
            currShapesTrainingImagesToShow = toggleTrainingVsTesting ? bananasTrainingImages : bananasTestImages;
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

const doToggleTrainingVsTestingImages = (button) => {

    modeShowTrainingTestImagesOnCanvas = true;
    doTrain = false;

    toggleTrainingVsTesting = toggleTrainingVsTesting ? false : true;

    if (toggleTrainingVsTesting) {
        button.className = 'btn btn-warning';
        button.innerHTML = 'Show Trainnig Images';
    } else {
        button.className = 'btn btn-info';
        button.innerHTML = 'Show Test Images';
    }
    doShowWhichTrainingOrTestImages();
}

const drawTrainingOrTestImagesOnCanvas = () => {

    background(invertTrainingImagesAndCanvasColoring ? 255 : 0);
    if (currShapesTrainingImagesToShow !== undefined) {
        drawImgSet(currShapesTrainingImagesToShow);
    }
}
