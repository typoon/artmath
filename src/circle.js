'use strict';

var Circle = (function () {

    /**
     * Constructor for the Circle class
     * This class represent a circle. It is composed of a Point2 object that
     * represents the center of the circle and an integer as the circle's 
     * radius.
     *
     * @author Henrique Montenegro Decaria
     * @class
     * @constructs Circle
     * @param {int} radius - The radius of the circle
     * @param {Point2} center - Point where the middle of the circle will be
     */
    function Circle(radius, center) {
        this.radius = radius;
        this.center = center;
    }

    return Circle;

}());

/**
 * Divides the circle in `divs` parts and returns an array of points of the
 * divisions created.
 * Supposing that the caller calls this method with a `divs` value of 10, then
 * an array with 10 points that are 36 degrees apart from each other would be
 * returned.
 *
 * @param {int} divs - Number of divisions to make. This value has to be greater than 2
 * @example <caption>Dividing a circle in 10 parts</caption>
 * var circle = new Circle(100, new Point2(200, 200));
 * var points = circle.getPoints(10);
 * console.log(points);
 */
Circle.prototype.getPoints = function(divs) {
    if(divs <= 2) {
        console.log('Cannot divide circle in less than 3 parts');
        return [];
    }

    var total = 360 / divs;
    var ret = new Array();

    for(var i = 0; i <= divs; i++) {
        var x = this.center.x + this.radius * Math.cos((i * total * (Math.PI/180)));
        var y = this.center.y + this.radius * Math.sin((i * total * (Math.PI/180)));
        var p = new Point2(Math.round(x), Math.round(y));

        ret.push(p);
    }

    return ret;
}

/**
 * Returns to the caller the point at `angle`.
 * If the circle was a clock, the following would be true:
 *
 * <ul>
 * <li>angle 0 degrees would be the number 3</li>
 * <li>angle 90 degrees would be the number 12</li>
 * <li>angle 180 degrees would be the number 9</li>
 * <li>angle 270 degrees would be the number 6</li>
 * </ul>
 *
 * Just as the conventional mathematical notation for circles are.
 *
 * @param {float} angle - The angle in radians
 * @returns {Point2} The point for that angle
 */
Circle.prototype.getPoint = function(angle) {
    var x = this.center.x + this.radius * Math.cos(angle);
    var y = this.center.y + this.radius * Math.sin(angle);

    return new Point2(Math.round(x), Math.round(y));
}

