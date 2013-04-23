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
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });
        
    var stack = d3.layout.stack()
        .values(function(d) {
            return d.values;
        });
    
    var color = d3.scale.ordinal()
        .domain(["positive", "neutral", "negative"])
        .range(["blue", "gray", "red"]);
        
    var update = function(data) {
        
        //Restructure the data as separate series
        data = color.domain().map(function(name) {
        
            //Generate a series for this sentiment
            var series = data.map(function(row) {
                return {
                    time: row.time,
                    y: +row[name]
                };
            });
        
            return {
                name: name,
                values: series
            }
        });
        
        data = stack(data);
        
        var lastSeries = data[data.length - 1].values
        var maxCount = d3.max(lastSeries, function(row){
            return row.y + row.y0;
        });
        
        // update our y scale
        y.domain([0, maxCount]);

        //add path elements
        chart.selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .classed('area', true);
            
        redraw();
    };
    
    var redraw = function() {
        //Update the axes
        svg.selectAll('g.x.axis')
            .call(xAxis);
        
        svg.selectAll('g.y.axis')
            .call(yAxis);
        
        svg.selectAll('path.area')
            .attr('d', function(d) {
                return area(d.values);
            })
            .style("fill", function(d) {
                return color(d.name); 
            });
    }
    
    update.domain = function(extent) {
        x.domain(extent);
        redraw();
    }
    
    return update;
}
