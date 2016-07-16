'use strict';

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

/**
 * Creates a canvas and retrieves its 2D context that is then returned to the
 * caller.
 *
 * @function
 * @param {int} width - The width of the canvas
 * @param {int} height - The height of the canvas
 * @param {string} id - The id of the canvas element
 * @returns {CanvasRenderingContext2D} - The 2D context used for drawing operations
 *
 */
function create2DContext(width, height, id) {
    var canvas = document.createElement(id);
    canvas.width = width;
    canvas.height = height;

    // TODO: delete the style line below
    canvas.style.border = "1px solid black";

    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.setPixel = function(x, y, w) {
        this.fillRect(x, y, w, w);
    }

    ctx.translate(0, HEIGHT);
    ctx.scale(1, -1);

    return ctx;
}


function getRandom(min, max) {
    return (Math.random() * (max - min)) + max;
}

function getRandomRound(min, max) {
    return Math.round(Math.random() * (max - min)) + max;
}

/**
 * Takes an array of points and draws a straight line between them in the
 * canvas context provided.
 *
 * @function
 * @param {CanvasRenderingContext2D} ctx - The 2D canvas context where to draw
 * @param {Array<Point2>} points - The array of points. Needs at least 2 points
 */
function draw(ctx, points) {

    if(points.length < 2) {
        console.log("At least 2 points need to be provided to be drawn");
        return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.closePath();
}
