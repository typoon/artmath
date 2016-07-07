var WIDTH = 800;
var HEIGHT = 800;
var ctx = get2DContext();
document.getElementById("draw-area").appendChild(ctx.canvas);

function draw(r, ctx) {
    var points = r.getPoints();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.stroke();
    ctx.closePath();
}

var SIZE = 20;
var r = new Rect(new Point2(0, 0), new Point2(SIZE, SIZE));
console.log(r.getPoints());


var colors = new Array();
colors = colors.concat(["#6d594a", "#cac5b0", ]);
colors = colors.concat(["#771100", "#CC6633", ]);
colors = colors.concat(["#66ccff"]); //, "#ffaa00"]);


for(i = 0; i < WIDTH/SIZE; i++) {
    for(j = 0; j < HEIGHT/SIZE; j++) {
        r.recenter(new Point2(SIZE * i + (SIZE/2), SIZE * j + (SIZE/2)));

        var currentColor = colors[Math.floor(getRandom(colors.length))];

        ctx.globalAlpha = Math.random() + 0.25;
        ctx.fillStyle = currentColor;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth= Math.round(getRandom(20));

        draw(r, ctx);

        //ctx.fill();
    }
}

