'use strict';

//////////////////////////////////////////////////////////////////////////////////////
// shapes raw data (training + test) from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsData;
let catsData;
let dogsData;
let flowersData;
let rainbowsData;

//////////////////////////////////////////////////////////////////////////////////////
// shapes raw training data portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTrainingData;
let catsTrainingData;
let dogsTrainingData;
let flowersTrainingData;
let rainbowsTrainingData;

//////////////////////////////////////////////////////////////////////////////////////
// shapes raw test data portion from input files
//////////////////////////////////////////////////////////////////////////////////////
let birdsTestData;
let catsTestData;
let dogsTestData;
let flowersTestData;
let rainbowsTestData;


let currShapesTrainingDataToShow;
let invertTrainingDataAndCanvasColoring = false;
let toggleTrainingVsTesting = false;
let currWhichShapeNameToShow;


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

                let value = invertTrainingDataAndCanvasColoring ? 255-imgSubArr[a] : imgSubArr[a];
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

const doShowWhichShapesTrainingData = (whichShapeNameToShow) => {

    // this normally called from UI button, but can also be called when
    // switching between test and training... thus there wont be a param
    // passed in, because we're not switching which shape category (dogs, cats,etc) to show,
    // just toggling test or training.
    // if a param IS passed, it's cuz we're switching categories
    if (whichShapeNameToShow!==undefined) { currWhichShapeNameToShow = whichShapeNameToShow; }
    else { whichShapeNameToShow = currWhichShapeNameToShow; }

    switch (whichShapeNameToShow) {
        case 'birds':
                    currShapesTrainingDataToShow = toggleTrainingVsTesting? birdsTrainingData : birdsTestData;
                    break;
        case 'cats':
                    currShapesTrainingDataToShow = toggleTrainingVsTesting? catsTrainingData : catsTestData;
                    break;
        case 'dogs':
                    currShapesTrainingDataToShow = toggleTrainingVsTesting? dogsTrainingData : dogsTestData;
                    break;
        case 'flowers':
                    currShapesTrainingDataToShow = toggleTrainingVsTesting? flowersTrainingData : flowersTestData;
                    break;
        case 'rainbows':
                    currShapesTrainingDataToShow = toggleTrainingVsTesting? rainbowsTrainingData : rainbowsTestData;
                    break;
        default:
                    currShapesTrainingDataToShow = undefined;
                    break;
    }
  
}

const doInvert = () => {
    invertTrainingDataAndCanvasColoring = invertTrainingDataAndCanvasColoring ? false : true;
}

const doToggleTrainingVsTesting = (obj) => {
    toggleTrainingVsTesting = toggleTrainingVsTesting ? false : true;

    if (toggleTrainingVsTesting) {
        obj.className = 'btn btn-warning';
        obj.innerHTML = 'Using Trainnig Data';
    } else {
        obj.className = 'btn btn-info';
        obj.innerHTML = 'Using Test Data';
    }
    doShowWhichShapesTrainingData();
}

const drawTrainingOrTestShapesDataOnCanvas = () => {

    background(invertTrainingDataAndCanvasColoring ? 255 : 0);
    if (currShapesTrainingDataToShow!==undefined) {
        drawImgSet(currShapesTrainingDataToShow);
    }
}