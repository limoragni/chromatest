var pause = document.getElementById('pause');
var videoControl = document.getElementById('video');

play.addEventListener('click', function(){
	videoControl.play();
})

pause.addEventListener('click', function(){
	videoControl.pause();

    var canvas2 = document.getElementById("canvas2");
    var context = canvas2.getContext('2d');

    // var data_type = jsfeat.U8_t | jsfeat.C1_t;
    // var my_matrix = new jsfeat.matrix_t(800, 640, data_type);

    // context.drawImage(video, 0, 0, 800, 640);

    // var image_data = context.getImageData(0, 0, 800, 640);
     
    // var canny = new jsfeat.matrix_t(800, 640, jsfeat.U8_t | jsfeat.C1_t);
    // jsfeat.imgproc.canny(image_data.data, canny, 0, 200);

    // console.log(canny);




        console.log(videoControl);
        var width = videoControl.width;
        var height = videoControl.height;
        context.drawImage(videoControl, 0, 0, width, height);
        var image_data = context.getImageData(1,1, width, height);
        console.log(image_data);
         
        var gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        console.log(gray_img)
        var code = jsfeat.COLOR_RGBA2GRAY;
        jsfeat.imgproc.grayscale(image_data.data, width, height, gray_img, code);

        var img = document.getElementById("image");
        img.src = canvas2.toDataURL();  

    

});

// declare our variables
// var seriously, // the main object that holds the entire composition
 

// seriously = new Seriously();

// var chroma = seriously.effect("chroma");
// var channels = seriously.effect("channels");
// var reformat = seriously.transform('reformat');
// var target = seriously.target('#canvas');

// // var target2 = seriously.target('#canvas2');

// // Create a source object by passing a CSS query string.
// var video = seriously.source('#video');


// reformat.source = video;
// reformat.width = 1440;
// reformat.height = 800;
// reformat.mode = 'contain';

// chroma.source = reformat;

// chroma.balance = "#chroma-balance";
// chroma.weight = "#chroma-weight";
// chroma.clipBlack = "#chroma-clipB";
// chroma.clipWhite = "#chroma-clipW";

// chroma.screen = '#80ea6a';

// channels.source = reformat;
// channels.alphaSource = chroma;

// target.source = channels;

// seriously.go();

var clicks = 0;
var lastClick = [0, 0];

document.getElementById('canvas').addEventListener('click', drawLine, false);



function getCursorPosition(e) {
    var x;
    var y;

    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return [x, y];
}

function drawLine(e) {
	console.log("XX")
    context = document.getElementById('canvas2').getContext('2d');

    x = getCursorPosition(e)[0] - this.offsetLeft;
    y = getCursorPosition(e)[1] - this.offsetTop;
    
    if (clicks != 1) {
        clicks++;
    } else {
        context.beginPath();
        context.moveTo(lastClick[0], lastClick[1]);
        context.lineTo(x, y, 6);
        
        context.globalAlpha = 0.5;
        context.strokeStyle = 'red';
        context.lineWidth = 3;
        context.stroke();
        
        clicks = 0;
    }
    
    lastClick = [x, y];
};