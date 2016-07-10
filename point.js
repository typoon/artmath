var Point2 = (function () {

    /**
     * @author Henrique Montenegro Decaria
     * @class
     * @tutorial Point2
     * @constructs Point2
     * @param {int} x - The x coordinate of the point
     * @param {int} y - The y coordinate of the point
     */
    function Point2(x, y) {
        this.x = x;
        this.y = y;
    }

    return Point2;
}());

// Rotates the point around the origin (0,0)
Point2.prototype.rotate = function (angle) {
    // Matrix multiplication
    // [A'] = [R] . [A]
    // Where:
    // [A] is the matrix representing the points to be rotated
    // [R] is the rotation matrix
    // [A'] is the resulting rotated matrix

    // For rotation, [R] is the following matrix:
    // [cos(angle) -sin(angle)]
    // [sin(angle) cos(angle)]

    // And the matrix [A] is:
    // [x]
    // [y]

    // Perform the dot product of the two matrixes and you have:
    // var xr = x * (Math.cos(angle)) + y * (-1 * Math.sin(angle));
    // var yr = x * (Math.sin(angle)) + y * (Math.cos(angle));

    var xr = this.x * (Math.cos(angle)) + this.y * (-1 * Math.sin(angle));
    var yr = this.x * (Math.sin(angle)) + this.y * (Math.cos(angle));

    this.x = xr;
    this.y = yr;

}

Point2.prototype.rotateRef = function (ref, angle) {
    var x = this.x - ref.x;
    var y = this.y - ref.y;

    var p = new Point2(x,y);
    p.rotate(angle);

    this.x = Math.round(p.x + ref.x);
    this.y = Math.round(p.y + ref.y);
}

Point2.prototype.clone = function() {
    return new Point2(this.x, this.y);
}


