function my_include(path) {
    var s = document.createElement('script');
    s.src = path;
    document.body.appendChild(s);
}

function get2DContext() {
    var canvas = document.createElement("canvas");

    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.border = "1px solid black";

    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.setPixel = function(x, y, w) {
        this.fillRect(x, y, w, w);
    }

    return ctx;
}


function getRandom(max) {
    return Math.random() * max;
}

function getRandomRound(max) {
    return Math.round(Math.random() * max);
}


