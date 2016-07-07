var Circle = (function () {

    /**
     * @param radius: int -
     * @param center: Point2
     */
    function Circle(radius, center) {
        this.radius = radius;
        this.center = center;
    }

    // @param divs - How many points to be returned. Circle will be evenly divided in the number of divs
    Circle.prototype.getPoints = function(divs) {
        if(divs <= 1) {
            console.log('Cannot divide circle in less than 0 parts');
            return [];
        }

        var total = 360 / divs;
        var ret = new Array();

        for(var i = 0; i < divs; i++) {
            var x = this.center.x + this.radius * Math.cos((i * total * (Math.PI/180)));
            var y = this.center.y + this.radius * Math.sin((i * total * (Math.PI/180)));
            var p = new Point2(Math.round(x), Math.round(y));

            ret.push(p);
        }

        return ret;
    }

    Circle.prototype.getPoint = function(angle) {
        var x = this.center.x + this.radius * Math.cos(angle);
        var y = this.center.y + this.radius * Math.sin(angle);

        return new Point2(Math.round(x), Math.round(y));
    }

    return Circle;
}());
