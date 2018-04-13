d3v3.select("input[value=\"1947\"]").property("checked", true);

var svgPie = d3v3.select("#pie-plot")
	.append("svg")
	.append("g")

svgPie.append("g")
	.attr("class", "slices");
svgPie.append("g")
	.attr("class", "labelName");
svgPie.append("g")
	.attr("class", "labelValue");
svgPie.append("g")
	.attr("class", "lines");

var width = d3v3.select("#pie-plot").node().clientWidth,
    height = d3v3.select("#pie-plot").node().clientHeight,
	radius = Math.min(width, height) / 2;

var pie = d3v3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3v3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(0);

var outerArc = d3v3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


 var div = d3v3.select("#pie-plot-container").append("div").attr("class", "toolTip");

svgPie.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var color = d3v3.scale.ordinal()
	.range(['#FF6138','#FFFF9D','#BEEB9F','#79BD8F','#00A388']);

//d3v3.csv("../data/Additional/pie_2017.csv", function(error, data) {
//    if (error) {
//        throw error;
//    }
//    createChart(data, g);
// });
var dataset1947;
var dataset1957;
var dataset1967;
var dataset1977;
var dataset1987;
var dataset1997;
var dataset2007;
var dataset2017;


d3v3.csv("./data/Additional/pie_1947.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1947 = data;
            change(dataset1947);
});

d3v3.csv("./data/Additional/pie_1957.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1957 = data;
});

d3v3.csv("./data/Additional/pie_1967.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1967 = data;
});

d3v3.csv("./data/Additional/pie_1977.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1977 = data;
});

d3v3.csv("./data/Additional/pie_1987.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1987 = data;
});

d3v3.csv("./data/Additional/pie_1997.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset1997 = data;
});

d3v3.csv("./data/Additional/pie_2007.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset2007 = data;
});

d3v3.csv("./data/Additional/pie_2017.csv",
        function(error, data) {
            if (error) {
                throw error;
            }
            sum = 0;
            data.forEach(function(d) {
                sum += +d.Value;
            });
            data.forEach(function(d) {
                d.label = d.Level;
                d.value = +d.Value;
                d.percent = Math.round((+d.Value*1.0/sum)*100);
            });
            dataset2017 = data;
});


d3v3.selectAll("input")
	.on("change", selectDataset);

function selectDataset() {
	var value = this.value;
	if (value == "1947") {
		change(dataset1947);
	}
	else if (value == "1957") {
		change(dataset1957);
	}
    else if (value == "1967") {
		change(dataset1967);
	}
    else if (value == "1977") {
		change(dataset1977);
	}
    else if (value == "1987") {
		change(dataset1987);
	}
    else if (value == "1997") {
		change(dataset1997);
	}
    else if (value == "2007") {
        change(dataset2007);
    }
	else if (value == "2017") {
        change(dataset2017);
    }
}

function change(data) {
	/* ------- PIE SLICES -------*/
 	var slice = svgPie.select(".slices").selectAll("path.slice")
         .data(pie(data), function(d){ return d.data.label });

	slice.enter()
	   .insert("path")
	   .style("fill", function(d) { return color(d.data.label); })
	   .attr("class", "slice");

	slice
	   .transition().duration(2000)
	   .attrTween("d", function(d) {
	       this._current = this._current || d;
	       var interpolate = d3v3.interpolate(this._current, d);
	       this._current = interpolate(0);
	       return function(t) {
	           return arc(interpolate(t));
	       };
	   })
	slice
	   .on("mousemove", function(d){
			 div.style("left", d3v3.event.clientX-120+"px");
	     div.style("top", d3v3.event.clientY-70+"px");
	     div.style("display", "inline-block");
	     div.html((d.data.label)+"<br>"+(d.data.percent)+"%");
	   });
	slice
	   .on("mouseout", function(d){
	       div.style("display", "none");
	   });

	slice.exit()
	   .remove();


   /* ------- TEXT LABELS -------*/

   var text = svgPie.select(".labelName").selectAll("text")
       .data(pie(data), function(d){ return d.data.label });

   text.enter()
       .append("text")
       .attr("dy", ".35em")
       .text(function(d) {
           return (d.data.label+": "+d.value+"%");
       });

   function midAngle(d){
       return d.startAngle + (d.endAngle - d.startAngle)/2;
   }

   text
       .transition().duration(2000)
       .attrTween("transform", function(d) {
           this._current = this._current || d;
           var interpolate = d3v3.interpolate(this._current, d);
           this._current = interpolate(0);
           return function(t) {
               var d2 = interpolate(t);
               var pos = outerArc.centroid(d2);
               pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
               return "translate("+ pos +")";
           };
       })
       .styleTween("text-anchor", function(d){
           this._current = this._current || d;
           var interpolate = d3v3.interpolate(this._current, d);
           this._current = interpolate(0);
           return function(t) {
               var d2 = interpolate(t);
               return midAngle(d2) < Math.PI ? "start":"end";
           };
       })
       .text(function(d) {
           return (d.data.label);
       });


   text.exit()
       .remove();

   /* ------- SLICE TO TEXT POLYLINES -------*/

   var polyline = svgPie.select(".lines").selectAll("polyline")
       .data(pie(data), function(d){ return d.data.label });

   polyline.enter()
       .append("polyline");

   polyline.transition().duration(2000)
       .attrTween("points", function(d){
           this._current = this._current || d;
           var interpolate = d3v3.interpolate(this._current, d);
           this._current = interpolate(0);
           return function(t) {
               var d2 = interpolate(t);
               var pos = outerArc.centroid(d2);
               pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
               return [arc.centroid(d2), outerArc.centroid(d2), pos];
           };
       });

   polyline.exit()
       .remove();

};
