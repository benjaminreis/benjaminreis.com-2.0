// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("right").ticks(10);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(parseDate(d.date.toString())); })
    .y(function(d) { return y(d.rank); });

// Adds the svg canvas
var svg = d3.select("body").selectAll("div.chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

    var color_hash = {  0 : ["harper", "DeepPink"],
                        1 : ["rowan", "DodgerBlue"],
                        2 : ["everett", "orange"],
                        3 : ["finn", "green"]
                      } 


// Get the data
//d3.csv("harper.csv", function(error1, data1) {
//	d3.csv("rowan.csv", function(error2, data2) {
//	data1.forEach(function(d) {
//		d.date = parseDate(d.date.toString());
//        d.rank = +d.rank;
//        
//    	data2.forEach(function(d) {
//		d.date = parseDate(d.date.toString());
//        d.rank = +d.rank;
//
//	});
//
//    
//});
//});
queue()
  .defer(d3.csv, "data/harper.csv")
  .defer(d3.csv, "data/rowan.csv")
  .defer(d3.csv, "data/everett.csv")
  .defer(d3.csv, "data/finn.csv")
  .await(analyze);


function analyze(error, harper, rowan, everett, finn) {
    if(error) { console.log(error); }
    var data_set = [harper, rowan, everett, finn];

          // Scale the range of the data
        x.domain(d3.extent(harper, function(d) { return parseDate(d.date.toString()); }));
        y.domain([1000, 0]);
    
        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr('stroke', 'DeepPink')
            .attr('fill', 'none')
            .attr("d", valueline(harper));
    
            svg.append("path")
            .attr("class", "line")
            .attr('stroke', 'DodgerBlue')
            .attr('fill', 'none')
            .attr("d", valueline(rowan));

            svg.append("path")
            .attr("class", "line")
            .attr('stroke', 'orange')
            .attr('fill', 'none')
            .attr("d", valueline(everett));

            svg.append("path")
            .attr("class", "line")
            .attr('stroke', 'green')
            .attr('fill', 'none')
            .attr("d", valueline(finn));
    
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
    
        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.append("svg:text")
           .attr("class", "title")
       .attr("x", 40)
       .attr("y", 20)
       .text("Popularity Rank of Baby Names");

        // add legend   
    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("x", width - 90)
      .attr("y", 250)
      .attr("height", 100)
      .attr("width", 100);

    legend.selectAll('g').data(data_set)
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
          .attr("x", width - 65)
          .attr("y", (i +9)*25)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", color_hash[String(i)][1]);
        
        g.append("text")
          .attr("x", width - 50)
          .attr("y", (i +9)* 25 + 8)
          .attr("height",30)
          .attr("width",100)
          .style("fill", color_hash[String(i)][1])
          .text(color_hash[String(i)][0]);
      });
    }


 //});
//});