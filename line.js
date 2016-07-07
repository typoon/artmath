var Line = (function () {

    function Line(p0, p1) {

        // I like when p1 is the one most to the left
        if(p0.x < p1.x) {
            this.p0 = p0;
            this.p1 = p1;
        } else {
            this.p0 = p1;
            this.p1 = p0;
        }
    }

    return Line;
}());
