const button_xray = document.getElementById("xray");
const button_segmentation = document.getElementById("segmentation");
const main_img = document.getElementById("main_img");
const search_bar = document.getElementById("search_pos");
/* const normal = document.getElementById("normal");
const pneumonia = document.getElementById("pneumonia");
const diagnosis = document.getElementById("diagnosis");
const treatment = document.getElementById("treatment");

var data = {
    "name": "/static/test_images/person1_virus_6.jpeg",
    "pneumonia": {
        accuracy: 0.57
    },
    "normal": {
        accuracy: 0.43
    }
} */
const left_panel = document.getElementById("left-panel");
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

var xray = true;
const canvasSample = document.getElementById("imageCanvasContainerSample")
const mainImg = document.getElementById("mainImgDiv")


function toggel_xray() {
    if (xray) {
        main_img.src = "/static/test_images/person141_bacteria_670.jpeg";
        button_segmentation.disabled = true;
        button_xray.disabled = false;

    } else {
        main_img.src = "/static/test_images/person1_virus_6.jpeg";
        button_xray.disabled = true
        button_segmentation.disabled = false;
    }

    xray = !xray;

    console.log(main_img.src)
}

function changeMainImg(sourceCanvasDiv) {
    console.log(sourceCanvasDiv.childNodes[0]);

    var sourceCanvas = sourceCanvasDiv.childNodes[0];
    var destinationCanvas =  mainImgDiv.childNodes[0]
    //grab the context from your destination canvas
    var destCtx = destinationCanvas.getContext('2d');

    //call its drawImage() function passing it the source canvas directly
    // destCtx.drawImage(sourceCanvas, 0, 0);
    console.log('main image div: ', mainImg.clientWidth, mainImg.clientHeight)
    destCtx.width = mainImgDiv.clientWidth;
    console.log(mainImgDiv.clientWidth)
    destCtx.height = Math.ceil(mainImgDiv.clientWidth*(sourceCanvas.height/sourceCanvas.width));
    console.log(Math.ceil(sourceCanvas.height/sourceCanvas.width))
    destinationCanvas.width = destCtx.width;
    destinationCanvas.height = destCtx.height;
    console.log('source canvas', sourceCanvas.width, sourceCanvas.height);
    console.log('destination canvas', destinationCanvas.width, destinationCanvas.height)
    console.log('destination ctx', destCtx.width, destCtx.height);
    destCtx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, destCtx.width, destCtx.height)
}

function revisedRandId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

function duplicate_canvas() {
    var cloned_canvas = canvasSample.cloneNode(true);
    cloned_canvas.id = revisedRandId(); 
    // cloned_canvas.onclick = duplicate; 
    console.log(cloned_canvas.id)
    left_panel.appendChild(cloned_canvas);
    cloned_canvas.style.visibility = '';
    console.log(cloned_canvas.childNodes);
    console.log()
    cloned_canvas.childNodes[0].id = cloned_canvas.id + '_canvas'
    return cloned_canvas.id
}


function handleImage(e){
    const canvasID = duplicate_canvas() 
    var canvasContainer = document.getElementById(canvasID);
    var canvas = document.getElementById(canvasContainer.childNodes[0].id);
    
    var ctx = canvas.getContext('2d');
    console.log('here')
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            console.log(canvasContainer.clientWidth)
            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvas.width*(img.height/img.width);
            // ctx.drawImage(img,0,0);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
