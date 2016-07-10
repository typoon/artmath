var WIDTH = 800;
var HEIGHT = 800;
var ctx = create2DContext(WIDTH, HEIGHT, "canvas");
document.getElementById("draw-area").appendChild(ctx.canvas);
//ctx.canvas.style.backgroundColor = "#000000";

var center_point = new Point2(WIDTH/2, HEIGHT/2);

function draw(points) {

    //var points = c.getPoints(45);
    points.push(points[0]);

    ctx.lineWidth = 2;
    ctx.beginPath();
    for(var j = 0; j < points.length-1; j++) {

        var p0 = points[j];
        var p1 = points[j+1];

        var x_space = Math.abs(p1.x - p0.x)/8;

        for(var k = 0; k < 8; k++) {
            var x = p0.x + Math.sin(k*x_space) + (Math.random() * 20);
            var y = p0.y + Math.sin(x);
        }

        ctx.lineTo(points[j].x, points[j].y);
    }
    ctx.stroke();
}

var c = new Circle(800, new Point2(400, 400));
var count = 0;
var grad;

//define gradient
grad = ctx.createRadialGradient(0, 0, 400, 0, 0, 0.9*HEIGHT);
grad.addColorStop(0.85, "rgba(255, 0, 10, 0.85)");
grad.addColorStop(0.5,  "rgba(255, 191, 0,   0.7)");



/**
 * Takes an initial shape and a final shape and creates an array of steps to 
 * morph into it.
 * This is acomplished by creating `steps` intermediary shapes between p_start
 * p_end
 *
 * Logic behind this method is:
 *  for(i = 0; i < steps; i++) {
 *      create the 'i'th shape between the start and the end shape by doing:
 *
 *      increment the start_point x and y a little bit for each point in start_point
 *          the increment should be the distance between p_start.x and p_end.x
 *          divided by the number of steps and multiplied by i
 *
 *      save this new aray of points as frame 'i'th
 *  }
 *
 *
 * @param p_start: Array<Point2> - points of the start shape
 * @param p_end: Array<Point2> - points of the final shape
 * @param steps: int - Number of shapes to be defined between start and end
 * @return Array<Array<Point2>> - Array containing `steps + 2` shapes
 */
function morph(p_start, p_end, steps) {
    if(p_start.length != p_end.length) {
        console.log("Number of points in p_start and p_end need to be the same");
        console.log("p_start has: " + p_start.length + " points");
        console.log("p_end has: " + p_end.length + " points");
        return;
    }

    var shapes = new Array();

    // Save initial shape
    shapes.push(p_start);

    // Push the intermediate shapes into shapes
    for(var i = 0; i < steps; i++) {
        var points = new Array();

        for(var j = 0; j < p_start.length; j++) {
            var x_dist = p_end[j].x - p_start[j].x;
            var y_dist = p_end[j].y - p_start[j].y;

            var x_step = x_dist / steps;
            var y_step = y_dist / steps;

            var xx = p_start[j].x + (x_step * (i+1));
            var yy = p_start[j].y + (y_step * (i+1));
            var p = new Point2(xx, yy);
            points.push(p);
        }

        shapes.push(points);
    }

    // Save the final shape
    shapes.push(p_end);

    return shapes;

}

function clearDrawAnimate(shapes, current_shape) {
    if(current_shape >= shapes.length) {
        animate(shapes[current_shape-1]);
    } else {
        clearDraw(shapes[current_shape]);
        window.setTimeout(function() {clearDrawAnimate(shapes, current_shape+1)}, 20);
    }
}


function clearDraw(points) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(var j = 0; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y);
        //if(j > 0)
        //    ctx.lineTo(points[j-1].x, points[j-1].y);
    }
    ctx.lineTo(points[0].x, points[0].y); // close the circle
    ctx.stroke();
    ctx.fill();
}


function animate(start_points) {

    ctx.strokeStyle = grad;
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.9;

    var DIVS = 360;

    if(start_points) {
        var points = start_points;
    } else {
        var points = new Array();
        for(var i = 0; i <= 360; i+= 360/DIVS) {
            var angle = i * Math.PI / 180;
            c.radius = Math.random() * getRandom(90) + 301;
            points.push(c.getPoint(angle));
        }
    }

    var points2 = new Array();
    for(var i = 0; i <= 360; i+= 360/DIVS) {
        var angle = i * Math.PI / 180;
        c.radius = Math.random() * getRandom(90) + 301;
        points2.push(c.getPoint(angle));
    }

    var shapes = morph(points, points2, 32);
    clearDrawAnimate(shapes, 0);
}

animate();
