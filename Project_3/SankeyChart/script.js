
//buttons:

/*document.getElementById("all").addEventListener("click", function( event ){
    showElement("sankey1");
    hideElement("sankey2");
    hideElement("sankey3");
},false);
document.getElementById("#men").addEventListener("click", function( event ){
    showElement("sankey2");
    hideElement("sankey1");
    hideElement("sankey3");
},false);
document.getElementById("#women").addEventListener("click", function( event ){
    showElement("sankey3");
    hideElement("sankey1");
    hideElement("sankey2");
},false);
*/
document.addEventListener("DOMContentLoaded", function(event) {
    // console.log("DOM fully loaded and parsed");
    showElement("sankey1");
    hideElement("sankey2");
    hideElement("sankey3");
    document.getElementById("all").className = "active";

document.getElementById("men").addEventListener("click", function( event ){
    showElement("sankey2");
    hideElement("sankey1");
    hideElement("sankey3");
    document.getElementById("men").className = "active";
    document.getElementById("women").className = "";
    document.getElementById("all").className = "";
},false);
document.getElementById("women").addEventListener("click", function( event ){
    showElement("sankey3");
    hideElement("sankey1");
    hideElement("sankey2");
    document.getElementById("women").className = "active";
    document.getElementById("men").className = "";
    document.getElementById("all").className = "";
},false);
document.getElementById("all").addEventListener("click", function( event ){
    showElement("sankey1");
    hideElement("sankey2");
    hideElement("sankey3");
    document.getElementById("all").className = "active";
    document.getElementById("women").className = "";
    document.getElementById("men").className = "";//("active");
},false);
  });


function hideElement(id) {
    var x = document.getElementById(id);
    x.style.display = "none";
}

function showElement(id){
    var x = document.getElementById(id);
    x.style.display = "block";

}



var units = "Widgets";

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = document.documentElement.clientWidth- margin.left -margin.right-100,
    height = 300 - margin.top - margin.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scaleOrdinal(d3.schemeCategory20);

// append the svg object to the body of the page
var svg = d3.select("#sankey1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var path = sankey.link();

// load the data
d3.json("./data/Additional/sankey_data.json", function(error, graph) {

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(13);

// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style('stroke-opacity', 0.3)
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });
svg.selectAll(".link")
  .style('stroke', function(d){
    return d.color;
  })
// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));



// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {
          // console.log(d);
		  return d.color = d.color })
      .style("stroke", function(d) {
		  return "white"; })
    .append("title")
      .text(function(d) {
		  return d.name + "\n" + format(d.value); });


// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return 0; })//return d.dy / 2;
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) {

      if (d.name.startsWith("$")){
        return false;
      }
      else{
          return true;

          //d.x < width ;
      }


                        })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});

var svg2 = d3.select("#sankey2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey2 = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var path2 = sankey2.link();

// load the data
d3.json("./data/Additional/sankey_data_male.json", function(error, graph) {

  sankey2
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(13);

// add in the links
  var link2 = svg2.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style('stroke-opacity', 0.3)
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link2.append("title")
        .text(function(d) {
    		return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });
svg2.selectAll(".link")
  .style('stroke', function(d){
    return d.color;
  })
// add in the nodes
  var node2 = svg2.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));



// add the rectangles for the nodes
  node2.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey2.nodeWidth())
      .style("fill", function(d) {
          // console.log(d);
		  return d.color = d.color })
      .style("stroke", function(d) {
		  return "white"; })
    .append("title")
      .text(function(d) {
		  return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node2.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return 0; })//return d.dy / 2;
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) {

      if (d.name.startsWith("$")){
        return false;
      }
      else{
          return true;

          //d.x < width ;
      }


                        })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

 //the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey2.relayout();
    link2.attr("d", path);
  }
});

var svg3 = d3.select("#sankey3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey3 = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var path3 = sankey3.link();

// load the data
d3.json("./data/Additional/sankey_data_female.json", function(error, graph) {

  sankey3
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(13);

// add in the links
  var link3 = svg3.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style('stroke-opacity', 0.3)
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link3.append("title")
        .text(function(d) {
    		return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });
svg3.selectAll(".link")
  .style('stroke', function(d){
    return d.color;
  })
// add in the nodes
  var node3 = svg3.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
		  return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));



// add the rectangles for the nodes
  node3.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey2.nodeWidth())
      .style("fill", function(d) {
          // console.log(d);
		  return d.color = d.color })
      .style("stroke", function(d) {
		  return "white"; })
    .append("title")
      .text(function(d) {
		  return d.name + "\n" + format(d.value); });

// add in the title for the nodes
    node3.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return 0; })//return d.dy / 2;
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) {

      if (d.name.startsWith("$")){
        return false;
      }
      else{
          return true;

          //d.x < width ;
      }


                        })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");


 //the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey3.relayout();
    link3.attr("d", path);
  }
});
