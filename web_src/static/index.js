const button_xray = document.getElementById("xray");
const button_segmentation = document.getElementById("segmentation");
const imageCanvasContainerSampleLeft = document.getElementById("imageCanvasContainerSampleLeft");
const imageCanvasContainerSampleCenter = document.getElementById("imageCanvasContainerSampleCenter");
const imageCanvasSampleCenter = document.getElementById("imageCanvasSampleCenter");
const search_bar = document.getElementById("search_pos");

const left_panel = document.getElementById("left-panel");
const center_panel = document.getElementById("center-panel");
console.log(center_panel)
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

var xray = true;

const mainImg = document.getElementById("mainImgDiv")


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
    hide_center_divs()
    console.log(sourceCanvasDiv.childNodes[0]);
    sourceCanvasDiv.id ;
    _center_img = document.getElementById((sourceCanvasDiv.id +'_center'));
    console.log(_center_img);
    _center_img.style.display = '';

}

function revisedRandId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

function duplicate_canvas(canvasDivToClone) {
    
    var cloned_canvas = canvasDivToClone.cloneNode(true);
    cloned_canvas.id = revisedRandId(); 

    console.log(cloned_canvas.id)

    left_panel.appendChild(cloned_canvas);
    

    cloned_canvas.style.display = '';
    console.log(cloned_canvas.childNodes);    
    // cloned_canvas.appendChild(document.createElement('canvas'))
    cloned_canvas.childNodes[0].id = cloned_canvas.id + '_canvas'
    // cloned_canvas.childNodes[0].className= "left-panel-image"
    return cloned_canvas.id
}

function duplicate_canvas_center(canvasToClone){
    console.log(imageCanvasContainerSampleCenter)
    
    // var cloned_canvas = canvasToClone.cloneNode(true);
    var cloned_canvas = document.createElement("canvas");
    cloned_canvas.classList.add("center-panel-image");
    cloned_canvas.setAttribute("id", "test")

    imageCanvasContainerSampleCenter.appendChild(cloned_canvas);
    cloned_canvas.style.display = '';

    return cloned_canvas.id
}
function hide_center_divs(){
    var children = imageCanvasContainerSampleCenter.querySelectorAll('canvas');
    console.log('childeren before for', children)
    console.log('childeren length', children.length)
    if (children.length != 0){
        for (var i = 0, len = children.length; i < len; i++) {
            console.log(children[i])
            children[i].style.display = 'none';
        }       
    }
}

    

function handleImage(e){

    const canvasIDLeft = document.getElementById(duplicate_canvas(imageCanvasContainerSampleLeft));
    hide_center_divs()
    const canvasIDcenter = document.getElementById(duplicate_canvas_center(imageCanvasSampleCenter));
    canvasIDcenter.id = canvasIDLeft.id + '_center';
    var canvasLeft = document.getElementById(canvasIDLeft.childNodes[0].id);
    console.log(canvasLeft)
    var canvasCenter = document.getElementById(canvasIDcenter.id);
    console.log(canvasCenter)
    var ctxLeft = canvasLeft.getContext('2d');
    var ctxCenter = canvasCenter.getContext('2d'); 


    console.log('here')
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            maxImgwidth = canvasIDLeft.clientWidth
            ctxLeft.width = canvasIDLeft.clientWidth;
            ctxLeft.height = ctxLeft.width*(img.height/img.width);
            // ctx.drawImage(img,0,0);
            ctxLeft.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctxLeft.width, ctxLeft.height)
            
            canvasIDcenter.width = imageCanvasContainerSampleCenter.clientWidth
            canvasIDcenter.height = imageCanvasContainerSampleCenter.clientHeight

            ctxCenter.width = imageCanvasContainerSampleCenter.clientWidth;
            ctxCenter.height = (ctxCenter.width)*(img.height/img.width);
            console.log(img.height,img.width)
            // ctx.drawImage(img,0,0);
            console.log(ctxCenter.width, ctxCenter.height)
            ctxCenter.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctxCenter.width, ctxCenter.height)
             

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
