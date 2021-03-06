var w = 500;
var h = 150;

var globalBarCount = 0;
var globalParCount = 0;

var dataset =  [ [5, 23, 75], [10, 14, 34], [13, 67, 23], [19, 10, 65], [21, 42, 29], [25,25, 25], [22, 90, 30], [18, 57,17], [15, 25, 35], [13, 26, 39], [11, 17, 85], [12, 36,24], [15, 60, 45], [20, 41, 11], [18, 77, 33], [17, 85, 55], [16, 23, 44], [18, 35, 23],[23, 55, 15], [25, 45, 100] ];

var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

var xScale = d3.scale.ordinal()
			   .domain(d3.range(dataset.length))
			   .rangeBands([0, w], 0.23);

var maxHeight = d3.max(dataset, function(d) { return d[0]; });

var yScale = d3.scale.linear()
			   .domain(d3.range(maxHeight))
			   .range([0,maxHeight]);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale(i);
   })
   .attr("y", function(d) {
   		return (d[0] * 4);
   })
   .attr("width", function(d){
   		return d[1] / 4;
   })
   .attr("height", function(d) {
   		return yScale(d[0]) * 4;
   })
   .attr("fill", "rgb(0, 0, 200)")
   .attr("opacity", function(d) {
		return (d[2] / 89);
   })
   .on("click", function() { 
   		sortBars();
   });;

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
   		return d[0];
   })
   .attr("text-anchor", "start")
   .attr("x", function(d, i) {
   		return xScale(i);
   })
   .attr("y", function(d) {
   		return (d[0] * 4) - 1;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "red");


var sortBars = function() {

	svg.selectAll("rect") 
	   .sort(function(a, b) {
			if ( globalBarCount % 3 == 0 ){
				return d3.ascending(a[0], b[0]);
			}
			else if ( globalBarCount % 2 == 0 ){
				return d3.ascending(a[2], b[2]); 
			}
			else{
				return d3.ascending(a[1], b[1]); 
			}
		})
	   .transition()
	   .duration(1000)
       .attr("x", function(d, i) {
            return xScale(i);
       });

    svg.selectAll("text")
	    .data(dataset.sort(function(a, b){
	    	if ( globalBarCount % 3 == 0 ){
				return d3.ascending(a[0], b[0]);
			}
			else if ( globalBarCount % 2 == 0 ){
				return d3.ascending(a[2], b[2]); 
			}
			else{
				return d3.ascending(a[1], b[1]); 
			}
	    }))
	    .transition()
	    .duration(1000)
	    .text(function(d) {
	   		return d[0];
	    })
	    .attr("x", function(d, i) {
	   		return xScale(i);
	    })
	    .attr("y", function(d){
	    	return (d[0] * 4) - 1;
	    });

    globalBarCount = globalBarCount + 1;
};

var scaling = function() {
	
	var bars = svg.selectAll("rect").data(dataset);
	var text = svg.selectAll("text").data(dataset);

	bars.transition()
		.duration(100)
		.attr("x", function(d, i){
			return xScale(i);
		})
		.attr("y", function(d){
			if ( globalParCount % 3 == 0 ){
				return (d[0] * 4) * (1 / 3);
			}
			else if ( globalParCount % 2 == 0 ){
				return (d[0] * 4);
			}
			else{
				return (d[0] * 4) * (2 / 3);
			}
		})
		.attr("width", function(d){
	   		return d[1] / 4;
	    });

	text.transition()
		.duration(100)
		.attr("x", function(d, i) {
	   		return xScale(i);
	    })
	    .attr("y", function(d) {
	    	if ( globalParCount % 3 == 0 ){
				return (d[0] * 4) * (1 / 3);
			}
			else if ( globalParCount % 2 == 0 ){
				return (d[0] * 4);
			}
			else{
				return (d[0] * 4) * (2 / 3);
			}
	    });

	globalParCount = globalParCount + 1;
};