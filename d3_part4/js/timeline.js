function timeline() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    var width = screenWidth * 0.66,
        height = 300,
        margins = {
            top: 25,
            right: 25,
            bottom: 25,
            left: 50
        },
        graphWidth = width - margins.right - margins.left,
        graphHeight = height - margins.top - margins.bottom;
        
    var svg = d3.select("body")
                .append("svg")
                .classed('area-chart', true)
                .attr('width', width)
                .attr('height', height);
        
    // our x (time) scale
    var x = d3.time.scale()
        .range( [ 0, graphWidth ] )
    
    // our y (count) scale
    var y = d3.scale.linear()
        .range([ graphHeight, 0 ]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
        
    svg.append("g")
        .classed("y axis", true)
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
            
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graphHeight) + ")" )
    
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", graphWidth)
        .attr("height", graphHeight);
    
    var chart = svg.append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
        .attr("clip-path", "url(#clip)")
        
    //A function that can generate a path
    var area = d3.svg.area()
        .x(function(d) { return x(d.time); })
        .y0(graphHeight)
        .y1(function(d) { return y(d.count); });
        
    //add a path element
    chart.append('path')
        .classed('area', true)
        
    var update = function(data) {
        
        var maxCount = d3.max(data, function(row){
            return +row.count;
        });
        
        var timeExtent = d3.extent(data, function(row) {
            return +row.time;
        });
        
        // update our y scale
        y.domain([0, maxCount]);

        svg.selectAll('path.area')
            .datum(data);
        
        redraw();
    };
    
    var redraw = function() {
        //Update the axes
        svg.selectAll('g.x.axis')
            .call(xAxis);
        
        svg.selectAll('g.y.axis')
            .call(yAxis);
        
        svg.selectAll('path.area')
            .attr('d', area)
    }
    
    update.domain = function(extent) {
        x.domain(extent);
        redraw();
    }
    
    return update;
}