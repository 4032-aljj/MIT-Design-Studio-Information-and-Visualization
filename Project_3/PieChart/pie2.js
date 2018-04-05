
var svg = d3.select("#plot1"),
    svg2 = d3.select("#plot2"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2.8;

var g = svg.append("g")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var g2 = svg2.append("g")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#FF6138','#FFFF9D','#BEEB9F','#79BD8F','#00A388']);

var pie2 = d3.pie().value(function(d) { 
        return d.Value; 
    });

var path = d3.arc()
             .outerRadius(radius - 10)
             .innerRadius(0);

var label = d3.arc()
              .outerRadius(radius+100)
              .innerRadius(radius - 80);

d3.csv("2017.csv", function(error, data) {
    if (error) {
        throw error;
    }
    createChart(data, g);
 });
d3.csv("1947.csv", function(error, data) {
    if (error) {
        throw error;
    }
    createChart(data, g2);
//    var arc = g.selectAll(".arc")
//               .data(pie2(data))
//               .enter().append("g")
//               .attr("class", "arc");
//
//    arc.append("path")
//       .attr("d", path)
//       .attr("fill", function(d) { return color(d.data.Level); });
//
//    console.log(arc)
//
//    arc.append("text")
//       .attr("transform", function(d) { 
//                return "translate(" + label.centroid(d) + ")"; 
//        })
//       .text(function(d) { return d.data.Level; });
    });

function createChart(data, element) {
    var arc = element.selectAll(".arc")
               .data(pie2(data))
               .enter().append("g")
               .attr("class", "arc");

    arc.append("path")
       .attr("d", path)
       .attr("fill", function(d) { return color(d.data.Level); });

    console.log(arc)

    arc.append("text")
       .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
       .text(function(d) { return d.data.Level; });  
}

    svg.append("g")
       .attr("transform", "translate(" + (width / 2 - 200) + "," + 20 + ")")
       .append("text")
       .text("Education Attainment in The United States Over Time - 2017")
       .attr("class", "title")

    svg2.append("g")
       .attr("transform", "translate(" + (width / 2 - 200) + "," + 20 + ")")
       .append("text")
       .text("Education Attainment in The United States Over Time - 1947")
       .attr("class", "title")