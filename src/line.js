'use strict';

var Line = (function () {
    /**
     * Constructor for the Line class
     * This class represents a line. It is composed of two Point2 objects and 
     * offers a set of methods to help manipulate the line.
     * It is possible to do things such as rotating the line, retrieving 
     * points to draw the line as a sine wave, clone the line and etc.
     *
     * @author Henrique Montenegro Decaria
     * @class
     * @tutorial line
     * @constructs Line
     * @param {Point2} p0 - The point where the line starts
     * @param {Point2} p1 - The point where the line ends
     */
    function Line(p0, p1) {

        this.p0 = p0.clone();
        this.p1 = p1.clone();

    }

    return Line;

}());


/**
 * Rotates the line represented by this instance `angle` degrees around 
 * this.p0
 * After calling this method, point p1 will have been modified 
 *
 * @param {float} angle - The angle to rotate in radians
 * 
 * @example
 * <caption> Example 1: Rotating a line 90 degrees </caption>
 * var p0 = new Point2(100, 100);
 * var p1 = new Point2(400, 100);
 * var line = new Line(p0, p1);
 * line.debug();
 * line.rotate(90 * Math.PI / 180);
 * line.debug();
 *
 * @example
 * <caption> Output: </caption>
 * [DEBUG] Line: p0(100,100) p1(400,100) slope angle (degree) = 0
 * [DEBUG] Line: p0(100,100) p1(100,400) slope angle (degree) = 90 
 * 
 */
Line.prototype.rotate = function(angle) {
    this.rotateRef(this.p0, angle);
}

/**
 * Rotates the line by pinning its middle point
 *
 * @TODO: implement me
 */
Line.prototype.rotateMiddle = function(angle) {
    var x = this.p0.x - this.p1.x;
    this.rotateRef(new Point2(x, y), angle);
}

/**
 * Rotates the line represented by this instance `angle` degrees around 
 * `ref`.
 * After calling this method, points p0 and p1 will have been modified
 *
 * @param {Point2} ref - Reference point around which the line should be 
 *                       rotated
 * @param {float} angle - The angle to rotate in radians
 */
Line.prototype.rotateRef = function(ref, angle) {

    this.p0.rotateRef(ref, angle);
    this.p1.rotateRef(ref, angle);

    /*
    var p0 = new Point2((this.p0.x - ref.x), (this.p0.y - ref.y));
    p0.rotateRef(ref, angle);
    var p1 = new Point2((this.p1.x - ref.x), (this.p1.y - ref.y));
    p1.rotate(angle);

    p0.x = Math.round(p0.x + ref.x);
    p0.y = Math.round(p0.y + ref.y);
    p1.x = Math.round(p1.x + ref.x);
    p1.y = Math.round(p1.y + ref.y);

    this.p0 = p0;
    this.p1 = p1;
    */
}


/**
 * Returns an array of points between p0 and p1 to draw the line in the 
 * format of a sine wave
 *
 * @param {int} divs - Number of points to be returned that constitute the
 *                     sine wave
 * @param {int} r - Radius (amplitude) of the sine wave
 * @returns {Array<Point2>} - An array of points that can be used to draw the
 *                            sine wave by connecting them with lines
 */
Line.prototype.getSinLine = function(divs, r) {
    var points = new Array();

    var slopeAngle = this.getSlopeAngle();
    var _ = this.clone();
    _.rotate((360 * Math.PI/180) - slopeAngle);
    var tmpP0 = _.p0;
    var tmpP1 = _.p1;

    var tmpLine = new Line(tmpP0, tmpP1);

    var distX = Math.round(Math.abs(tmpP1.x - tmpP0.x));
    var distY = Math.round(Math.abs(tmpP1.y - tmpP0.y));

    var incX = distX / divs;
    var incY = distY / divs;

    var incAngle = 360 / divs;

    for(var i = 0; i <= divs; i++) {
        var angle = i * incAngle * (Math.PI / 180);

        var x = tmpP0.x + (incX * i);
        var y = r * Math.sin(angle) + tmpP0.y + (incY*i);

        var p = new Point2(Math.round(x), Math.round(y));

        // Now rotate the point to the original slope
        p.rotateRef(this.p0, slopeAngle);

        points.push(p);

    }

    return points;

}

/**
 * Returns an array of points between p0 and p1 to draw the line in the 
 * format of a cosine wave
 *
 * @param {int} divs - Number of points to be returned that constitute the
 *                     cosine wave
 * @param {int} r - Radius (amplitude) of the cosine wave
 * @returns {Array<Point2>} - An array of points that can be used to draw the
 *                            cosine wave by connecting them with lines
 */

Line.prototype.getCosLine = function(divs, r) {
    var points = new Array();

    var slopeAngle = this.getSlopeAngle();
    var _ = this.clone();
    _.rotate((360 * Math.PI/180) - slopeAngle);
    var tmpP0 = _.p0;
    var tmpP1 = _.p1;

    var tmpLine = new Line(tmpP0, tmpP1);

    var distX = Math.round(Math.abs(tmpP1.x - tmpP0.x));
    var distY = Math.round(Math.abs(tmpP1.y - tmpP0.y));

    var incX = distX / divs;
    var incY = distY / divs;

    var incAngle = 360 / divs;

    for(var i = 0; i <= divs; i++) {
        var angle = i * incAngle * (Math.PI / 180);

        var x = tmpP0.x + (incX * i);
        var y = r * Math.cos(angle) + tmpP0.y + (incY*i);

        var p = new Point2(Math.round(x), Math.round(y));

        // Now rotate the point to the original slope
        p.rotateRef(this.p0, slopeAngle);

        points.push(p);

    }

    return points;

}


/**
 * Makes a deep copy of this instance
 *
 * @returns {Line} - A deep copy of this instance
 */
Line.prototype.clone = function() {
    return new Line(this.p0.clone(), this.p1.clone());
}

/**
 * Returns the angle of inclination of this line in radians
 *
 * @returns {float} - The angle of inclination of the line in radians
 */
Line.prototype.getSlopeAngle = function() {
    if((this.p1.y - this.p0.y) == 0) { // 0 degrees or 180 degrees
        if(this.p1.x > this.p0.x) { // 0 degrees
            var slopeAngle = 0;
            //console.log("0 degrees");
        } else { // 180 degrees
            var slopeAngle = 180 * Math.PI / 180;
            //console.log("180 degrees");
        }
    } else if((this.p1.x - this.p0.x) == 0) { // 90 degrees or 270 degrees
        if(this.p0.y > this.p1.y) { // 270 degrees
            var slopeAngle = 270 * Math.PI / 180;
            //console.log("270 degrees");
        } else { // 90 degrees
            var slopeAngle = 90 * Math.PI / 180;
            //console.log("90 degrees");
        }
    } else {
        var slopeAngle = Math.atan2((this.p1.y - this.p0.y), (this.p1.x - this.p0.x));
    }

    return slopeAngle;

}

/**
 * Divides the line in `n` equal parts and returns an array of points for those
 * divisions. 
 * The return will contain `n+1` points
 *
 * Consider the following line:
 * *---------*
 * p0        p1
 *
 * By calling divide(3), it will be divided in the following points:
 *
 * *---*---*---*
 * p0  p1  p2  p3
 *
 * @param {int} n - Number of divisions to make
 * @returns Array<Point2> The points that divide the line
 */
Line.prototype.divide = function(n) {
        var points = new Array();

        if(n < 1) {
            console.log("Cannot divide line in 0 or less parts");
            return [];
        }

        if(n == 1) {
            return [this.p0.clone(), this.p1.clone()];
        }

        var incX = (this.p1.x - this.p0.x) / n;
        var incY = (this.p1.y - this.p0.y) / n;

        for(var i = 0; i <= n; i++) {
            var p = new Point2(this.p0.x + (incX * i), this.p0.y + (incY * i));
            points.push(p);
        }

        return points;
}

/**
 * Used for debugging purposes. Can be safely ignored. Simply logs to the
 * console the points p0 and p1 and the slope angle of the line.
 */
Line.prototype.debug = function() {
    var angleRadian = this.getSlopeAngle();
    var angle = Math.round((angleRadian * 180) /  Math.PI);
    console.log("[DEBUG] Line: p0("+this.p0.x+","+this.p0.y+") p1("+this.p1.x+","+this.p1.y+") slope angle (degree) = " + angle);
}

