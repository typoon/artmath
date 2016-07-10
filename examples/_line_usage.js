var HEIGHT = 800;
var WIDTH = 800;
var ctx = create2DContext(WIDTH, HEIGHT, "canvas");
var p0 = new Point2(100, 100);
var p1 = new Point2(500, 100);
var l = new Line(p0, p1);

document.getElementById("draw-area").appendChild(ctx.canvas);

function draw(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(var i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

// Make the quadrants sane, by moving the origin to the lower left corner of
// the canvas. Now it has the same properties as we usually get in math
ctx.translate(0, HEIGHT);
ctx.scale(1, -1);

var p0 = new Point2(400, 400);
var p1 = new Point2(800, 400);
var l = new Line(p0, p1);

ctx.setPixel(400-5, 400-5, 10);

for(i = 0; i <= 34; i++) {

    //ctx.strokeStyle = "#ff0000";
    //draw([l.p0, l.p1]);

    var pts = l.getCosLine(72, 50);

    ctx.strokeStyle = "#000000";
    draw(pts);

    l.rotate(10 * Math.PI / 180);
}


for(var k = 10; k < 21; k++) {
    var circle = new Circle(100+(k*16), p0);
    var pts = circle.getPoints(36);
    var radius = 4;

    for(var i = 0; i < pts.length -1; i++) {
        var l = new Line(pts[i], pts[i+1]);
        if(((i+k) % 2) == 0) {
            ctx.strokeStyle = "#ff0000";
            draw(l.getCosLine(6, radius));
        } else {
            ctx.strokeStyle = "#0000ff";
            draw(l.getSinLine(6, radius));
        }

    }
}


var p0 = new Point2(100, 100);
var p1 = new Point2(400, 100);
var line = new Line(p0, p1);
line.debug();
line.rotate(90 * Math.PI / 180);
line.debug();
