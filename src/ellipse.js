'use strict';

var Ellipse = (function () {

    /**
     * Constructor for the Ellipse class
     * This class represent a ellipse. It is composed of a Point2 object that
     * represents the center of the ellipse and an integer as the ellipse's 
     * radius.
     *
     * @author Henrique Montenegro Decaria
     * @class
     * @constructs Ellipse
     * @param {int} radius - The radius of the ellipse
     * @param {Point2} center - Point where the middle of the ellipse will be
     */
    function Ellipse(radiusX, radiusY, center) {
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.center = center;
    }

    return Ellipse;

}());

/**
 * Divides the ellipse in `divs` parts and returns an array of points of the
 * divisions created.
 * Supposing that the caller calls this method with a `divs` value of 10, then
 * an array with 10 points that are 36 degrees apart from each other would be
 * returned.
 *
 * @param {int} divs - Number of divisions to make. This value has to be greater than 2
 * @example <caption>Dividing a ellipse in 10 parts</caption>
 * var ellipse = new Ellipse(100, new Point2(200, 200));
 * var points = ellipse.getPoints(10);
 * console.log(points);
 */
Ellipse.prototype.getPoints = function(divs) {
    if(divs <= 2) {
        console.log('Cannot divide ellipse in less than 3 parts');
        return [];
    }

    var total = 360 / divs;
    var ret = new Array();

    for(var i = 0; i <= divs; i++) {
        var x = this.center.x + this.radiusX * Math.cos((i * total * (Math.PI/180)));
        var y = this.center.y + this.radiusY * Math.sin((i * total * (Math.PI/180)));
        var p = new Point2(Math.round(x), Math.round(y));

        ret.push(p);
    }

    return ret;
}

/**
 * Returns to the caller the point at `angle`.
 * If the ellipse was a clock, the following would be true:
 *
 * <ul>
 * <li>angle 0 degrees would be the number 3</li>
 * <li>angle 90 degrees would be the number 12</li>
 * <li>angle 180 degrees would be the number 9</li>
 * <li>angle 270 degrees would be the number 6</li>
 * </ul>
 *
 * Just as the conventional mathematical notation for ellipses are.
 *
 * @param {float} angle - The angle in radians
 * @returns {Point2} The point for that angle
 */
Ellipse.prototype.getPoint = function(angle) {
    var x = this.center.x + this.radiusX * Math.cos(angle);
    var y = this.center.y + this.radiusY * Math.sin(angle);

    return new Point2(Math.round(x), Math.round(y));
}

