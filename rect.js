var Rect = (function () {

    // Based on the two points given, figure out the other
    // two points, so that we can easily rotate later if needed
    // or just to return them so they can be drawn by external functions
    function Rect(startPoint, endPoint) {
        /*
         *   ltp      rtp
         *    +-------+
         *    |       |
         *    |       |
         *    +-------+
         *   lbp      rbp
         */
        var ltp; // left top point
        var rtp; // right top point
        var rbp; // right bottom point
        var lbp; // left bottom point


        if(Math.min(startPoint.x, endPoint.x) == startPoint.x) { // p1 is most to the left
            if(Math.min(startPoint.y, endPoint.y) == startPoint.y) { // p1 is most to the top
                ltp = startPoint.clone();
                rbp = endPoint.clone();
                rtp = new Point2(rbp.x, ltp.y);
                lbp = new Point2(ltp.x, rbp.y);
            } else { // p2 is most to the top
                lbp = startPoint.clone();
                rtp = endPoint.clone();
                ltp = new Point2(lbp.x, rtp.y);
                rbp = new Point2(rtp.x, lbp.y);
            }
        } else { // p2 is most to the left
            if(Math.min(startPoint.y, endPoint.y) == endPoint.y) { // p2 is most to the top
                ltp = endPoint.clone();
                rbp = startPoint.clone();
                rtp = new Point2(rbp.x, ltp.y);
                lbp = new Point2(ltp.x, rbp.y);
            } else { // p1 is most to the top
                lbp = endPoint.clone();
                rtp = startPoint.clone();
                ltp = new Point2(lbp.x, rtp.y);
                rbp = new Point2(rtp.x, lbp.y);
            }
        }

        this.p0 = ltp;
        this.p1 = rtp;
        this.p2 = rbp;
        this.p3 = lbp;

        this.centerX = Math.round(Math.abs(this.p0.x - this.p1.x)/2 + this.p0.x);
        this.centerY = Math.round(Math.abs(this.p3.y - this.p0.y)/2 + this.p0.y);
    }


    // Bring the middle of the rectangle to the origin (0,0) and rotate it
    // there. After that, move it back to the original place
    Rect.prototype.rotate = function(angle) {

        var p0 = this.p0;
        var p1 = this.p1;
        var p2 = this.p2;
        var p3 = this.p3;

        p0.x -= this.centerX;
        p0.y -= this.centerY;
        p1.x -= this.centerX;
        p1.y -= this.centerY;
        p2.x -= this.centerX;
        p2.y -= this.centerY;
        p3.x -= this.centerX;
        p3.y -= this.centerY;

        p0.rotate(angle);
        p1.rotate(angle);
        p2.rotate(angle);
        p3.rotate(angle);

        p0.x += this.centerX;
        p0.y += this.centerY;
        p1.x += this.centerX;
        p1.y += this.centerY;
        p2.x += this.centerX;
        p2.y += this.centerY;
        p3.x += this.centerX;
        p3.y += this.centerY;

        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

    }

    Rect.prototype.getPoints = function() {
        return [this.p0, this.p1, this.p2, this.p3];
    }

    Rect.prototype.getCenter = function() {
        p = new Point2(this.centerX, this.centerY);
        return p;
    }

    // Moves the rectangle to the new center
    // @param p: Point2 - New center
    // Maybe call this translate()?
    Rect.prototype.recenter = function(p) {
        var a = Math.round(p.x - this.centerX);
        var b = Math.round(p.y - this.centerY);

        this.p0.x += a;
        this.p1.x += a;
        this.p2.x += a;
        this.p3.x += a;

        this.p0.y += b;
        this.p1.y += b;
        this.p2.y += b;
        this.p3.y += b;

        this.centerX = p.x;
        this.centerY = p.y;
    }

    return Rect;
}());

