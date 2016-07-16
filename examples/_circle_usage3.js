var WIDTH = 800;
var HEIGHT = 800;
var ctx = create2DContext(WIDTH, HEIGHT, "canvas");
document.getElementById("draw-area").appendChild(ctx.canvas);

//define gradient
grad = ctx.createRadialGradient(0, 0, 400, 0, 0, 0.9*HEIGHT);
grad.addColorStop(1,   "rgba(0,   100, 200, 0.8)");
grad.addColorStop(0.5, "rgba(200, 150, 200, 0.8)");
grad.addColorStop(0,   "rgba(200, 0,   239, 0.8)");


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



/*
 * General algorithm:
 *  Generate TOTAL_CIRCLES different circles
 *      Generate the morph points between circle0 and circle1
 *      Generate the morph points between circle1 and circle2
 *      so on til circle31 and circle0
 *
 * Store all the generated points in an array of the type Array<Array<Point2>>
 * which means [[points_circle0], [points_circle0_step1]
 *
 * When drawing each of the points, translate them to x+random() and y+random()
 */

var moveY = 0;
function clearDraw(points, count) {
    if(moveY % 5 != 0) {
        ctx.strokeStyle = "rgba(0,0,0,0.8)";
    } else {
        ctx.strokeStyle = grad;
    }

    ctx.fillStyle = grad; //colors[count % colors.length];

    ctx.lineWidth = 1;
    ctx.beginPath();

    getRandom(0, 10) >= 5 ? moveY += 0.5: moveY -= 0.5;
    ctx.moveTo(points[0].x+count, points[0].y + moveY);
    for(var j = 0; j < points.length; j++) {
        ctx.lineTo(points[j].x+count, points[j].y + moveY);
    }
    ctx.lineTo(points[0].x+count, points[0].y + moveY); // Close the circle
    ctx.stroke();
    ctx.fill();

}

function clearDrawAnimate(shapes, current_shape) {
    if(current_shape >= shapes.length) {
        return;
    } else {
        clearDraw(shapes[current_shape], current_shape);
        window.setTimeout(function() {clearDrawAnimate(shapes, current_shape+1)}, 20);
    }
}


var TOTAL_CIRCLES = 32;
var PPC = 180; // Points Per Circle

var circles = new Array();
var all_circles = new Array();

var c = new Circle(100, new Point2(0, 400));

// Generate the random circles
for(var i = 0; i < TOTAL_CIRCLES; i++) {
    var points = new Array();
    for(var j = 0; j < 360; j+= 360/PPC) {
        var angle = j * Math.PI / 180;
        points.push(c.getPoint(angle));
        c.radius = Math.random() * getRandom(0, 200) + 100 ;
    }

    circles.push(points);
}

circles.push(circles[0]); // Add the first circle at the end of the array to
                          // make it easy to close the loop
console.log("circles = ");
console.log(circles);
for(var i = 0; i < circles.length-1; i++) {
    var tmp = morph(circles[i], circles[i+1], 64);
    all_circles = all_circles.concat(tmp);
}

clearDrawAnimate(all_circles, 0);
