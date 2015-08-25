var pause = document.getElementById('pause');
var videoControl = document.getElementById('video');

play.addEventListener('click', function(){
	videoControl.play();
})

jsfeat.matrix_t.prototype.copyToImageDataU8C1 =
    function (dstImageData) {
        var width = dstImageData.width;
        var height = dstImageData.height;
        var dst = dstImageData.data;
        var src = this.data;
        var r, c, v, dstOffset;
        for (r = 0; r < height; r++) {
            for (c = 0; c < width; c++) {
                v = src[(r * width) + c];
                dstOffset = (r * width * 4) + (c * 4);
                dst[dstOffset + 0] = v; // R
                dst[dstOffset + 1] = v; // G
                dst[dstOffset + 2] = v; // B
                dst[dstOffset + 3] = 255; // A
            }
        }
    };

pause.addEventListener('click', function(){
	videoControl.pause();

    var canvas2 = document.getElementById("canvas2");
    var context = canvas2.getContext('2d');
    canvas2.style.zIndex = "-100";

        console.log(videoControl);
        var width = videoControl.width;
        var height = videoControl.height;
        context.drawImage(videoControl, 0, 0, width, height);
        var imageData = context.getImageData(0,0, width, height);
        console.log(imageData);
         
        var gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        var canny = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t);
        var code = jsfeat.COLOR_RGBA2GRAY;
        var gray = jsfeat.imgproc.grayscale(imageData.data, width, height, gray_img, code);
        jsfeat.imgproc.canny(gray_img, canny, 50, 200);

        canny.copyToImageDataU8C1(imageData);
        context.putImageData(imageData, 0, 0);

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