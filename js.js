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

        var width = videoControl.width;
        var height = videoControl.height;
        context.drawImage(videoControl, 0, 0, width, height);
        var imageData = context.getImageData(0,0, width, height);
        console.log(imageData);

        var code = jsfeat.COLOR_RGBA2GRAY;

        var gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        var canny = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t);
        var blurred = new jsfeat.matrix_t(width, height, jsfeat.U8C1_t);

        jsfeat.imgproc.grayscale(imageData.data, width, height, gray_img, code);
        jsfeat.imgproc.canny(gray_img, canny, 60, 200);

        var kernel_size = 5
        var buf = kernel_size + width;
        filter = [[1,1,1],[1,1,1],[1,1,1]];

        convolution(buf,canny.data,blurred.data,width,height,filter,kernel_size,3);
        console.log(blurred);

        blurred.copyToImageDataU8C1(imageData);
        context.putImageData(imageData, 0, 0);
    

});


var convolution = function(buf, src_d, dst_d, w, h, filter, kernel_size, half_kernel) {
    var i=0,j=0,k=0,sp=0,dp=0,sum=0.0,sum1=0.0,sum2=0.0,sum3=0.0,f0=filter[0],fk=0.0;
    var w2=w<<1,w3=w*3,w4=w<<2;
    // hor pass
    for (; i < h; ++i) { 
        sum = src_d[sp];
        for (j = 0; j < half_kernel; ++j) {
            buf[j] = sum;
        }
        for (j = 0; j <= w-2; j+=2) {
            buf[j + half_kernel] = src_d[sp+j];
            buf[j + half_kernel+1] = src_d[sp+j+1];
        }
        for (; j < w; ++j) {
            buf[j + half_kernel] = src_d[sp+j];
        }
        sum = src_d[sp+w-1];
        for (j = w; j < half_kernel + w; ++j) {
            buf[j + half_kernel] = sum;
        }
        for (j = 0; j <= w-4; j+=4) {
            sum = buf[j] * f0, 
            sum1 = buf[j+1] * f0,
            sum2 = buf[j+2] * f0,
            sum3 = buf[j+3] * f0;
            for (k = 1; k < kernel_size; ++k) {
                fk = filter[k];
                sum += buf[k + j] * fk;
                sum1 += buf[k + j+1] * fk;
                sum2 += buf[k + j+2] * fk;
                sum3 += buf[k + j+3] * fk;
            }
            dst_d[dp+j] = sum;
            dst_d[dp+j+1] = sum1;
            dst_d[dp+j+2] = sum2;
            dst_d[dp+j+3] = sum3;
        }
        for (; j < w; ++j) {
            sum = buf[j] * f0;
            for (k = 1; k < kernel_size; ++k) {
                sum += buf[k + j] * filter[k];
            }
            dst_d[dp+j] = sum;
        }
        sp += w;
        dp += w;
    }

    // vert pass
    for (i = 0; i < w; ++i) {
        sum = dst_d[i];
        for (j = 0; j < half_kernel; ++j) {
            buf[j] = sum;
        }
        k = i;
        for (j = 0; j <= h-2; j+=2, k+=w2) {
            buf[j+half_kernel] = dst_d[k];
            buf[j+half_kernel+1] = dst_d[k+w];
        }
        for (; j < h; ++j, k+=w) {
            buf[j+half_kernel] = dst_d[k];
        }
        sum = dst_d[(h-1)*w + i];
        for (j = h; j < half_kernel + h; ++j) {
            buf[j + half_kernel] = sum;
        }
        dp = i;
        for (j = 0; j <= h-4; j+=4, dp+=w4) { 
            sum = buf[j] * f0, 
            sum1 = buf[j+1] * f0,
            sum2 = buf[j+2] * f0,
            sum3 = buf[j+3] * f0;
            for (k = 1; k < kernel_size; ++k) {
                fk = filter[k];
                sum += buf[k + j] * fk;
                sum1 += buf[k + j+1] * fk;
                sum2 += buf[k + j+2] * fk;
                sum3 += buf[k + j+3] * fk;
            }
            dst_d[dp] = sum;
            dst_d[dp+w] = sum1;
            dst_d[dp+w2] = sum2;
            dst_d[dp+w3] = sum3;
        }
        for (; j < h; ++j, dp+=w) {
            sum = buf[j] * f0;
            for (k = 1; k < kernel_size; ++k) {
                sum += buf[k + j] * filter[k];
            }
            dst_d[dp] = sum;
        }
    }
    }

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