var pie;

d3.csv("2017.csv", function(d) {
    return {
    Level : d.Level,
    Value : +d.Value,
    };
    
    
}, function (data) {
    console.log(data);
    var colors = ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388'];
    var content = data.map(function (obj, idx) {
        return {'label': obj.Level, 'value': obj.Value, 'color': colors[idx]};
    });
    var csvData = {'content': content};
    
    
    pie = new d3pie("pieChart", {

	"header": {
		"title": {
			"text": "Education Attainment in The United States Over Time",
			"fontSize": 22,
			"font": "verdana"
		},
		"subtitle": {
			"text": "Based Off of Population that is 25 Years and Older for Given Year",
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"text": "Census Data: 1947-2017",
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 500,
		"canvasWidth": 700,
		"pieOuterRadius": "90%"
	},
    "data": csvData,

        
    misc: {
		colors: {
			background: "#f0f0f0",
        }
    },
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"mainLabel": {
			"font": "verdana"
		},
		"percentage": {
			"color": "#000000",
			"font": "verdana",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#e1e1e1",
			"font": "verdana"
		},
		"lines": {
			"enabled": true,
			"style": "straight"
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	}
});
});

