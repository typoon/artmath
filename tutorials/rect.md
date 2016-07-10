This class is used to create a rectangle (that includes squares!). It takes two
Point2 parameters 

Available methods:

## constructor(startPoint, endPoint)

### Arguments

* startPoint : Point2
* endPoint   : Point2

### Description

Construct a rectangle object with width Math.abs(endPoint.x - startPoint.x) and
heigh Math.abs(endPoint.y - startPoint.y).

### Example

~~~javascript
var p0 = new Point2(100, 100);
var p1 = new Point2(200, 200);

var r = new Rect(p0, p1);
console.log(r);
~~~

## rotate(angle)

### Parameters
None

### Description
Rotates the square by **angle**.
Angle should be given in radians.
This method changes the object, meaning that **getPoints()** will return the
points of the rotated square and the original will be lost.

### Example

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


## getPoints()

### Arguments
None

### Description
Returns an array of four points that represent each corner of the rectangle.
One can trace lines between adjacent points in the array to draw the rectangle.

### Example

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

document.body.appendChild(ctx.canvas);

~~~

## getCenter()

### Arguments
None

### Description
Returns the point that represents the center of the rectangle.

### Example

~~~javascript
var ctx = get2DContext();
var p0 = new Point2(100, 100);
var p1 = new Point2(200, 200);

var r = new Rect(p0, p1);
var center = rect.getCenter();

console.log("Center X: " + center.x);
console.log("Center Y: " + center.y);

~~~

## recenter(center)

### Arguments
center: Point2

### Description

### Example
