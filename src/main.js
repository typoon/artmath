// In order to use this code, the following scripts are needed:
// my_include('point.js');
// my_include('rect.js');


function get2DContext() {
    var canvas = document.createElement("canvas");
    canvas.height = 300;
    canvas.width = 300;
    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");
    return ctx;
}

function draw(r, ctx) {
    var points = r.getPoints();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();
    ctx.closePath();
}

var ctx = get2DContext();
var p0 = new Point2(100, 100);
var p1 = new Point2(200, 200);

var r = new Rect(p0, p1);

draw(r, ctx);
r.rotate(45 * (Math.PI/180));
draw(r, ctx);

document.body.appendChild(ctx.canvas);

/*


var HEIGHT = 500;
var WIDTH = 900;

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

var ctx = get2DContext();

document.getElementById("draw-area").appendChild(ctx.canvas);


var colors = new Array();
colors = colors.concat(["#6d594a", "#cac5b0", "#96a399", "#b8bfc6", "#8ba4b5"]);
colors = colors.concat(["#771100", "#CC6633", "#FF9900", "#999999", "#aaaaaa"]);
colors = colors.concat(["#eeeeee", "#66ccff","#66ccff","#66ccff"]); //, "#ffaa00"]);

var p0 = new Point2(110, 110);
var p1 = new Point2(240, 240);
var rect = new Rect(p0, p1);
var angle = 45 * (Math.PI / 180);

var points = rect.getPoints();

var centers = [
    new Point2(100,100),
    new Point2(800, 300),
    new Point2(Math.random() * 900, 300),
    new Point2(Math.random() * 900, Math.random() * 400),
];

console.log("Center: ");
console.log(rect.getCenter());

for(i = 0; i < 100; i++) {
    //var p = Math.floor(getRandom(centers.length));
    //rect.recenter(centers[p]);


    rect.recenter(new Point2(Math.random() * WIDTH, Math.random() * HEIGHT));

    for(j = 0; j < 18; j++) {
        angle = 10 * (Math.PI / 180);
        points = rect.getPoints();
        ctx.globalAlpha = 0.3;


        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fillStyle = colors[Math.floor(getRandom(colors.length))];
        ctx.fill();
        ctx.stroke();

        rect.rotate(angle);
    }

    /*
    ctx.closePath();
    ctx.beginPath();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#ffffff";
    ctx.arc(rect.getCenter().x, rect.getCenter().y, 65, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    */

/*
}
*/

/*

angle = 45* (Math.PI / 180);
points = rect.getPoints();

ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);
ctx.lineTo(points[1].x, points[1].y);
ctx.lineTo(points[2].x, points[2].y);
ctx.lineTo(points[3].x, points[3].y);
ctx.lineTo(points[0].x, points[0].y);
ctx.fillStyle = colors[Math.floor(getRandom(colors.length))];
ctx.fill();
ctx.stroke();


points = rect2.getPoints();

ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);
ctx.lineTo(points[1].x, points[1].y);
ctx.lineTo(points[2].x, points[2].y);
ctx.lineTo(points[3].x, points[3].y);
ctx.lineTo(points[0].x, points[0].y);
ctx.fillStyle = colors[Math.floor(getRandom(colors.length))];
ctx.fill();
ctx.stroke();

rect.recenter(new Point2(rect2.getCenter().x, rect2.getCenter().y));
console.log(rect);
console.log(rect2);

rect.rotate(angle);
points = rect.getPoints();
ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);
ctx.lineTo(points[1].x, points[1].y);
ctx.lineTo(points[2].x, points[2].y);
ctx.lineTo(points[3].x, points[3].y);
ctx.lineTo(points[0].x, points[0].y);
ctx.fillStyle = colors[Math.floor(getRandom(colors.length))];
ctx.fill();
ctx.stroke();

*/
