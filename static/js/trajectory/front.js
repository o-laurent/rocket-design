data = JSON.parse(localStorage.getItem("optimizedValues"))
a = data.a
points = getPoints(data)
traceTrajectory(points, a)


function getPoints(data) {
    x_data = data.stock_x 
    y_data = data.stock_y
    points = []
    for (let i=0; i<x_data.length; i++) {
        points.push({'x': x_data[i], 'y': y_data[i]})
    } 
    return points
}


function traceTrajectory(points, a) {
    circle = []
    circle_a = []
    centerX = 0
    centerY = 0
    radius = 6371000
    steps = points.length
    for (var i = 0; i < steps; i++) {
        xValues = (centerX + a * Math.cos(2 * Math.PI * i / steps));
        yValues = (centerY + a * Math.sin(2 * Math.PI * i / steps));
        circle_a.push({'x': xValues, 'y': yValues})

        xValues = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
        yValues = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
        circle.push({'x': xValues, 'y': yValues})
    }

    document.body.style.margin="0px"; // Eliminate default margin from <body> element

    var data = points;

    var outerWidth  = Math.round(700*(d3.extent(data, xValue)[1]-d3.extent(data, xValue)[0])/(d3.extent(data, yValue)[1]-d3.extent(data, yValue)[0])), outerHeight = 700;    // includes margins

    var margin = {top: 100, right: 20, bottom: 80, left: 80};   // clockwise as in CSS

    var width = outerWidth - margin.left - margin.right,       // width of plot inside margins
    height = outerHeight - margin.top - margin.bottom;     // height   "     "

    function xValue(d) { return d.x; }      // accessors
    function yValue(d) { return d.y; }

    var x = d3.scaleLinear()                // interpolator for X axis -- inner plot region
        .domain(d3.extent(data, xValue))
        .range([0,height*(d3.extent(data, xValue)[1]-d3.extent(data, xValue)[0])/(d3.extent(data, yValue)[1]-d3.extent(data, yValue)[0])]);

    var y = d3.scaleLinear()                // interpolator for Y axis -- inner plot region
        .domain(d3.extent(data, yValue))
        .range([height,0]);                  // remember, (0,0) is upper left -- this reverses "y"

    var line = d3.line()                     // SVG line generator
        .x(function(d) { return x(d.x); } )
        .y(function(d) { return y(d.y); } );

    var xAxis = d3.axisBottom(x)
        .ticks(4)                            // request 5 ticks on the x axis

    var yAxis = d3.axisLeft(y)                // y Axis
        .ticks(4)

    var svg = d3.select("#container").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight);        // Note: ok to leave this without units, implied "px"

    var g = svg.append("g")                  // <g> element is the inner plot area (i.e., inside the margins)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("g")                            // render the Y axis in the inner plot area
        .attr("class", "y axis")
        .call(yAxis);

    g.append("g")                            // render the X axis in the inner plot area
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")  // axis runs along lower part of graph
        .call(xAxis);

    g.append("path")                         // plot the data as a line
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style('fill', 'none')
        .style('stroke', '#fff')
        .transition()
        .delay(500)
        .duration(1000)
        .style('stroke', '#000')

    g.append("path")                         // plot the data as a line
        .datum(circle)
        .attr("class", "line")
        .attr("d", line)
        .style('fill', '#6b93d6')
        .style('stroke', '#6b93d6')

    g.append("path")                         // plot the data as a line
        .datum(circle_a)
        .attr("class", "line")
        .attr("d", line)
        .style('fill', 'none')
        .style('stroke', '#6b93d6')
    /*var linePathLength = linePath.node().getTotalLength();
    linePath
        .attr("stroke-dasharray", linePathLength)
        .attr("stroke-dashoffset", linePathLength)
        .transition()
            .duration(30000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);*/

}

function SpinnerOn() {
    -1
}