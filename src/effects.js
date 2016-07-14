'use strict';

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


