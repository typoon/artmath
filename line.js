var Line = (function () {

    function Line(p0, p1) {

        this.p0 = p0.clone();
        this.p1 = p1.clone();

    }

    /*
     * Rotates `angle` degrees around this.p0
     */
    Line.prototype.rotate = function(angle) {
        this.rotateRef(this.p0, angle);
    }

    /*
     * @param ref: Point2
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


    /*
     * Returns the points between p0 and p1 to draw the line in the format of
     * a sine wave
     *
     * @param divs: int - Number of points to be returned
     * @param r: int - Radius of the sin wave
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

    /*
     * Returns the points between p0 and p1 to draw the line in the format of
     * a cosine wave
     *
     * @param divs: int - Number of points to be returned
     * @param r: int - Radius of the cosine wave
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


    Line.prototype.clone = function() {
        return new Line(this.p0.clone(), this.p1.clone());
    }

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

    Line.prototype.debug = function() {
        var angleRadian = this.getSlopeAngle();
        var angle = Math.round((angleRadian * 180) /  Math.PI);
        console.log("[DEBUG] Line: p0("+this.p0.x+","+this.p0.y+") p1("+this.p1.x+","+this.p1.y+")");
        console.log("[DEBUG] Line: slope angle = " + angle);
    }

    return Line;
}());
