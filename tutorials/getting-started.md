The Artmath library offers a few different classes to deal mostly with
geometric shapes in an easy way. It also has a few functions to facilitate
some common tasks related to drawing. 

There are two main files that are included in every project using the Artmath
library, and these are:

* utils.js 
* point.js

The `utils.js` file offers a handful of functions. The most important one is 
the [create2DContext]{@link create2DContext}. This function creates a canvas element and retrieves 
its 2D context that is then returned to the caller. This is used to facilitate
the boring steps that need to be done for that every time one wants to draw in 
a canvas. All that is left for the user to do is just draw in the canvas and then
append it to an HTML element to see the beautiful results.

For example, create a page with the following contents (make sure to fix the
path in the `src` attribute of the tags to point to the correct place where the
ArtMath files are):


~~~xml
<div id="draw-area"></div>
<script src="/util.js"></script>
<script src="/point.js"></script>
<script src="/getting-started.js"></script>
~~~

And then, create the `getting-started.js` file, with the following contents:

~~~javascript
var width = 200;
var height = 200;
var ctx = create2DContext(width, height, "canvas");

document.getElementById("draw-area").appendChild(ctx.canvas);
ctx.canvas.style.border = "1px red solid";

var p0 = new Point2(10, 10);
var p1 = new Point2(190, 190);

ctx.beginPath();
ctx.moveTo(p0.x, p0.y);
ctx.lineTo(p1.x, p1.y);
ctx.stroke();
~~~

Accessing the page created above, should result in something like the
following:

<div id="draw-area"></div>
<script src="/util.js"></script>
<script src="/point.js"></script>

<script>
var width = 200;
var height = 200;
var ctx = create2DContext(width, height, "canvas");

document.getElementById("draw-area").appendChild(ctx.canvas);
ctx.canvas.style.border = "1px red solid";

var p0 = new Point2(10, 10);
var p1 = new Point2(190, 190);

ctx.beginPath();
ctx.moveTo(p0.x, p0.y);
ctx.lineTo(p1.x, p1.y);
ctx.stroke();


</script>

Just make sure to always include both `utils.js` and `point.js` to the pages
and things should just work.

## Where to go from here?

This was a real quick introduction to getting a canvas setup and drawing
something in it. I'd recommend reading any of the following tutorials according
to what you want to do:

* {@tutorial point}
* {@tutorial line}
* {@tutorial circle}
* {@tutorial rect}
