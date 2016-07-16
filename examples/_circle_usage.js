var WIDTH = 800;
var HEIGHT = 800;
var ctx = create2DContext(WIDTH, HEIGHT, "canvas");
document.getElementById("draw-area").appendChild(ctx.canvas);
ctx.canvas.style.backgroundColor = "#000000";

var center_point = new Point2(WIDTH/2, HEIGHT/2);

var colors = new Array();
//colors = colors.concat(["#6d594a", "#cac5b0", "#96a399", "#b8bfc6", "#8ba4b5"]);
colors = colors.concat(["#771100", "#CC6633", "#FF9900", "#999999", "#aaaaaa"]);
//colors = colors.concat(["#eeeeee", "#66ccff","#66ccff","#66ccff"]); //, "#ffaa00"]);

//var colors = ["#71ACBF", "#FFBF00"];

function draw(c) {

    var points = c.getPoints(72);
    points.push(points[0]);

    //ctx.strokeStyle = colors[getRandomRound(0, colors.length)];
    //ctx.lineWidth = getRandomRound(0, 3)+1;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for(var j = 0; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y);
    }
    ctx.stroke();

}

var c = new Circle(1, new Point2(WIDTH/2, HEIGHT/2));

function animate(i) {
    if(i > 1980)
        return;

    //for(var i = 1; i < 1800; i++) { 
        p = c.getPoint(i * Math.PI / 180);

        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = colors[i % colors.length];
        var circle = new Circle(10+c.radius, p);
        draw(circle);

        if(i % 30 == 0)
            c.radius += 5;
    //}
    window.setTimeout(function() { animate(i+1), 10 });
}


var d = new Circle(66*5, new Point2(WIDTH/2, HEIGHT/2));
function animate2(i) {
    if(i < 0)
        return;

    //for(var i = 1; i < 1800; i++) { 
        p = d.getPoint(i * Math.PI / 180);

        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = colors[i % colors.length];
        var circle = new Circle(10+d.radius, p);
        draw(circle);

        if(i % 30 == 0)
            d.radius -= 5;
    //}
    window.setTimeout(function() { animate2(i-1), 10 });
}

animate(0);
animate2(1980);

// Option 1

/*
for(var i = 0; i < HEIGHT/2 - 25; i+=5) {
    var c = new Circle(i + 20, center_point);
    var points = c.getPoints(72);
    points.push(points[0]);


    ctx.globalAlpha = (Math.random() * 0.2) + 0.2;
    //ctx.strokeStyle = colors[getRandomRound(0, colors.length)];
    ctx.lineWidth = getRandomRound(0, 3)+1;
    ctx.beginPath();
    for(var j = 0; j < points.length; j++) {
        ctx.lineTo(points[j].x, points[j].y);
    }
    ctx.stroke();
}

var c = new Circle(150, center_point);
var points = c.getPoints(36);
ctx.globalAlpha = 0.1;
var alpha = 0.1;

for(var k = 10; k >= 0; k--) {
    for(var i = 0; i < points.length; i++) {
        var c = new Circle(100 + (k * 10), points[i]);
        var color = colors[getRandomRound(0, colors.length)];

        var ps = c.getPoints(90);
        ps.push(ps[0]);

        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();

        for(var j = 0; j < ps.length; j++) {
            ctx.lineTo(ps[j].x, ps[j].y);
        }
        ctx.stroke();

        ctx.fillStyle = color;
        alpha += 0.0005;
        ctx.globalAlpha = alpha;
        ctx.fill();

    }
}
*/

// End option 1
