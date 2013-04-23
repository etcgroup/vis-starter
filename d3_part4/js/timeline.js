function timeline() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
        
    var width = screenWidth * 0.66,
        height = 400,
        margins = {
            top: 20,
            right: 20,
            bottom: 50,
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
            
            svg.selectAll('g.y.axis')
                .transition()
                .call(yAxis);
            
            svg.selectAll('path.area')
                .datum(data)
                .transition()
                .attr('d', area)
        });
    };
    
    return update;
}