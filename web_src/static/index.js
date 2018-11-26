const button_xray = document.getElementById("xray");
const button_segmentation = document.getElementById("segmentation");
const imageCanvasContainerSampleLeft = document.getElementById("imageCanvasContainerSampleLeft");
const imageCanvasContainerSampleCenter = document.getElementById("imageCanvasContainerSampleCenter");
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
const center_panel = document.getElementById("center-panel");
console.log(center_panel)
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
    sourceCanvasDiv.id ;
    _center_img = document.getElementById((sourceCanvasDiv.id +'_center'));
    console.log(_center_img);
    _center_img.style.display = '';

}

function revisedRandId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

function duplicate_canvas(canvasDivToClone, centerOrLeft) {
    
    var cloned_canvas = canvasDivToClone.cloneNode(true);
    cloned_canvas.id = revisedRandId(); 

    console.log(cloned_canvas.id)
    if (centerOrLeft == 'left'){
        console.log('here left')
        left_panel.appendChild(cloned_canvas);
    }
    if (centerOrLeft =='center'){
        center_panel.appendChild(cloned_canvas);
    }

    cloned_canvas.style.display = '';
    console.log(cloned_canvas.childNodes);    
    // cloned_canvas.appendChild(document.createElement('canvas'))
    cloned_canvas.childNodes[0].id = cloned_canvas.id + '_canvas'
    // cloned_canvas.childNodes[0].className= "left-panel-image"
    return cloned_canvas.id
}


function handleImage(e){

    const canvasIDLeft = document.getElementById(duplicate_canvas(imageCanvasContainerSampleLeft, 'left'));
    const canvasIDcenter = document.getElementById(duplicate_canvas(imageCanvasContainerSampleCenter, 'center'));
    canvasIDcenter.id = canvasIDLeft.id + '_center';
    var canvasLeft = document.getElementById(canvasIDLeft.childNodes[0].id);
    var canvasCenter = document.getElementById(canvasIDcenter.childNodes[0].id);
    var ctxLeft = canvasLeft.getContext('2d');
    var ctxCenter =canvasCenter.getContext('2d'); 


    console.log('here')
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            // console.log("canvasContainer.clientWidth", canvasContainer.clientWidth)
            ctxLeft.width = canvasIDLeft.clientWidth;
            ctxLeft.height = ctxLeft.width*(img.height/img.width);
            // ctx.drawImage(img,0,0);
            ctxLeft.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctxLeft.width, ctxLeft.height)
            
            ctxCenter.width = canvasIDLeft.clientWidth;
            ctxCenter.height = canvasIDcenter.width*(img.height/img.width);
            // ctx.drawImage(img,0,0);
            ctxCenter.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctxCenter.width, ctxCenter.height)
             

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
