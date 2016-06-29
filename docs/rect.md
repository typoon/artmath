Available methods:

## constructor(startPoint, endPoint)

## rotate(angle)
Rotates the square by **angle**.
Angle should be given in radians.

~~~javascript

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

~~~

This method changes the object.

getPoints()
getCenter()
recenter()
