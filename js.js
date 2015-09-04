var pause = document.getElementById('pause');
var videoControl = document.getElementById('video');
var play = document.getElementById('play');

play.addEventListener('click', function(){
	videoControl.play();
})

pause.addEventListener('click', function(){
    videoControl.pause();
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