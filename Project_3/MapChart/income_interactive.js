// Plot constants
let incomeMargin = {t: 5, r: 25, b: 20, l: 25}
let incomeWidth = d3.select('.plot').node().clientWidth - incomeMargin.r - incomeMargin.l
let incomeHeight = d3.select('.plot').node().clientHeight - incomeMargin.t - incomeMargin.b
let incomeMapScale = Math.min(0.5, incomeWidth/760)
let incomeLegendW = Math.min(incomeWidth, 300)
let incomeLegendH = 20

// Dictionary of {id: value}
let incomeByID = {}
let incomeDomain = [Infinity, -Infinity]
let incomeNumScales = 6
let incomeStateNames = {}

// Append svgs to divs
let incomePlot = d3.select('#plot-income')
  .append('svg')
  .attr('width', incomeWidth + incomeMargin.r + incomeMargin.l)
  .attr('height', incomeHeight + incomeMargin.t + incomeMargin.b)

let incomeLegendPlot = d3.select('#legend-income')
  .append('svg')
  .attr('width', incomeLegendW + 40)
  .attr('height', incomeLegendH + 20)

// Map variables
let incomeMapPath = d3.geoPath()
let incomeMap

// Legend variables
let incomeLegend

// Slider variables
let incomeSlider

// Queue data files, parse them and use them
let incomeQueue = d3.queue()
  .defer(d3.csv, './data/Additional/income_by_state_16.csv', parseIncomeData)
  .defer(d3.json, './data/Additional/us_map.json')
  .await(incomeDataLoaded)

function incomeDataLoaded(err, data, map){
  // Populate incomeByID and incomeDomain
  data.forEach(function(d){
    incomeByID[d.id] = d.income
    incomeDomain[0] = Math.min(incomeDomain[0], d.income)
    incomeDomain[1] = Math.max(incomeDomain[1], d.income)
    incomeStateNames[d.id] = d.state
  })

  // Initialize the slider
  incomeSlider = document.getElementById('slider-income')
  noUiSlider.create(incomeSlider, {
  	range: {
  		'min': incomeDomain[0],
  		'max': incomeDomain[1]
  	},
    step: 2000,
    margin: 2000,
  	start: [ incomeDomain[0], incomeDomain[1] ],
  	connect: true,
  	direction: 'ltr',
  	orientation: 'horizontal',
  	behaviour: 'tap',
    pips: {
  		mode: 'values',
  		values: [25000, 40000, 55000, 70000],
  		density: 200000/(incomeDomain[1]-incomeDomain[0]),
      format: wNumb({
        prefix: '$'
      })
  	}
  })

  // Add event listener to the slider
  incomeSlider.noUiSlider.on('update', function(values, handle) {
    if (incomeMap) { colorIncomeMap() }
  })

  // Append map chart to plot
  incomeMap = incomePlot.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(map, map.objects.states).features)
    .enter().append('path')
    .attr('d', incomeMapPath)
    .style('stroke', '#AAAAAA')
    .attr('transform', `scale(${incomeMapScale})`)
    .on("mousemove", function(d) {
      $(this).attr('fill-opacity', '0.6')
      d3.select('#income-tooltip')
        .text(incomeStateNames[d.id])
        .style('top', `${d3.event.layerY+15}px`)
        .style('left', `${d3.event.layerX+15}px`)
      $("#income-tooltip").show()
    })
    .on("mouseout", function() {
      $(this).attr('fill-opacity', '1')
      $("#income-tooltip").hide()
    })

  // Append legend to plot
  colorIncomeMap()
}

function colorIncomeMap() {
  let domainRange = incomeSlider.noUiSlider.get()
  let edRange = edSlider.noUiSlider.get()
  let domainLow = parseInt(domainRange[0])
  let domainHigh = parseInt(domainRange[1])

  // Create a new color scale
  let color = d3.scaleLinear()
    .domain([0, incomeNumScales-1])
    .range([edColors[edRange[1]-1][0], edColors[edRange[1]-1][1]])
  let unit = (domainHigh - domainLow)/incomeNumScales

  // Update the fill function of map
  incomeMap.style('fill', function(d) {
    if (domainLow > incomeByID[d.id] || incomeByID[d.id] > domainHigh) {
      return '#AAA'
    }
    return color(Math.floor((incomeByID[d.id]-domainLow)/unit))
  })

  // Update the legend
  updateIncomeLegend(domainLow, domainHigh, color, unit)
}

function updateIncomeLegend(domainLow, domainHigh, color, unit) {
  incomeLegendPlot.append('g')
    .attr('class', 'legendLinear')

  let legendLinear = d3.legendColor()
    .cells(incomeNumScales)
    .shapeWidth(incomeLegendW/incomeNumScales)
    .orient('horizontal')
    .scale(color)
    .labels(function(d) {
      let value = (domainLow + unit * (d.i + 1))/1000
      if (unit > 1000) { return d.i == 0 ? `$${Math.round(value)}k` : `${Math.round(value)}k` }
      return d.i == 0 ? `$${value.toFixed(1)}k` : `${value.toFixed(1)}k`
    })

  incomeLegendPlot.select('.legendLinear')
    .call(legendLinear)
}

function parseIncomeData(d){
  return {
    id : d["Target Geo Id2"],
    state : d["Geographical Area"],
    income: +d["Dollar"],
  }
}
