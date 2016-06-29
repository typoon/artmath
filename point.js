var Point2 = (function () {

    function Point2(x, y) {
        this.x = x;
        this.y = y;
    }

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

    Point2.prototype.clone = function() {
        return new Point2(this.x, this.y);
    }

    return Point2;
}());

