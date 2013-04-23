function overview() {
    var focusTimeline = timeline();

    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    var width = screenWidth * 0.66,
        height = 100,
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

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
        
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(" + margins.left + "," + (margins.top + graphHeight) + ")" )
    
    var chart = svg.append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
    
    //A function that can generate a path
    var area = d3.svg.area()
        .x(function(d) { return x(d.time); })
        .y0(graphHeight)
        .y1(function(d) { return y(d.count); });
        
    //add a path element
    chart.append('path')
        .classed('area', true)
    
    var brushed = function() {
        focusTimeline.domain(brush.empty() ? x.domain() : brush.extent());
    }
        
    var brush = d3.svg.brush()
        .x(x)
        .on("brush", brushed);
    
    chart.append("g")
        .attr("class", "x brush")
        .call(brush)
      .selectAll("rect")
        .attr("y", -6)
        .attr("height", height + 7);
        
    var update = function(hashtag) {
        var datafile = "data/ht_" + hashtag + ".csv";
    
        d3.csv(datafile, function(data) {
            //Multiply all timestamps by 1000 for milliseconds
            data.forEach(function(row) {
                row.time = row.time * 1000;
            });
            
            var maxCount = d3.max(data, function(row){
                return +row.count;
            });
            
            var timeExtent = d3.extent(data, function(row) {
                return +row.time;
            });
            
            // update our x scale
            x.domain( timeExtent );

            // update our y scale
            y.domain([0, maxCount]);
            
            //Update the axes
            svg.selectAll('g.x.axis')
                .transition()
                .call(xAxis);
            
            svg.selectAll('path.area')
                .datum(data)
                .transition()
                .attr('d', area);
            
            focusTimeline(data);
            brushed();
        });
    };
    
    return update;
}