var width = d3.select('#plot1').node().clientWidth,
    height = d3.select('#plot1').node().clientHeight,
    radius = Math.min(width, height) / 2.8;

var piePlot = d3.select('#plot1')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

var piePlot2 = d3.select('#plot2')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
console.log(height)


var g = piePlot.append("g")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var g2 = piePlot2.append("g")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var pieColor = d3.scaleOrdinal(['#FF6138','#FFFF9D','#BEEB9F','#79BD8F','#00A388']);

var pie2 = d3.pie().value(function(d) {
        return d.Value;
    });

var piePath = d3.arc()
             .outerRadius(radius - 10)
             .innerRadius(0);

var pieLabel = d3.arc()
              .outerRadius(radius + 100)
              .innerRadius(radius - 80);

d3.csv("/Project_3/data/Additional/pie_2017.csv", function(error, data) {
    if (error) {
        throw error;
    }
    createChart(data, g);
 });
d3.csv("/Project_3/data/Additional/pie_1947.csv", function(error, data) {
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
       .attr("d", piePath)
       .attr("fill", function(d) { return pieColor(d.data.Level); });

    console.log(arc)

    arc.append("text")
       .attr("transform", function(d) {
                return "translate(" + pieLabel.centroid(d) + ")";
        })
       .text(function(d) { return d.data.Level; });
}
