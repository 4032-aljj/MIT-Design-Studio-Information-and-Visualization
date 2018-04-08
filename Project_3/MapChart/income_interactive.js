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
  		density: 5,
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

  // Append legend to plot
  appendIncomeLegend()
  colorIncomeMap()
}

function colorIncomeMap() {
  let domainRange = incomeSlider.noUiSlider.get()

  // Create a new color scale
  let color = d3.scaleLinear()
    .domain([domainRange[0], domainRange[1]])
    .range(['#FFF', $('#slider-education .noUi-connect').css('background-color')])

  // Update the fill function of map
  incomeMap.style('fill', function(d) {
    if (domainRange[0] > incomeByID[d.id] || incomeByID[d.id] > domainRange[1]) {
      return '#AAA'
    }
    return color(incomeByID[d.id])
  })

  // Update the legend
  updateIncomeLegend(domainRange[0], domainRange[1], color(domainRange[0]), color(domainRange[1]))
}

function updateIncomeLegend(domainLow, domainHigh, colorLow, colorHigh) {
  // Update the gradient range
  incomeLegend.select("#gradient-income-low").attr('stop-color', colorLow)
  incomeLegend.select("#gradient-income-high").attr('stop-color', colorHigh)

  // Create new scale and axis
  let legendScale = d3.scaleLinear()
    .domain([domainLow, domainHigh])
    .range([0, incomeLegendW])

  let legendAxis = d3.axisBottom()
    .scale(legendScale)
    .ticks(5)
    .tickSizeOuter(0)
    .tickFormat(function(d) { return `$${d}` })

  // Update the axis
  incomeLegendPlot.selectAll("g.legend-axis").remove()
  incomeLegendPlot.append('g')
    .attr('class', 'legend-axis')
    .attr('transform', `translate(20, ${incomeLegendH})`)
    .call(legendAxis)
}

function appendIncomeLegend() {
  incomeLegend = incomeLegendPlot.append('defs')
    .append('svg:linearGradient')
    .attr('id', 'gradient-income')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '100%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad')

  incomeLegend.append('stop')
    .attr('id', 'gradient-income-low')
    .attr('offset', '0%')
    .attr('stop-color', '#FFF')
    .attr('stop-opacity', 1)

  incomeLegend.append('stop')
    .attr('id', 'gradient-income-high')
    .attr('offset', '100%')
    .attr('stop-color', '#FFF')
    .attr('stop-opacity', 1)

  incomeLegendPlot.append('rect')
    .attr('width', incomeLegendW)
    .attr('height', incomeLegendH)
    .style('fill', 'url(#gradient-income)')
    .attr('transform', `translate(20, 0)`)
}

function parseIncomeData(d){
  return {
    id : d["Target Geo Id2"],
    state : d["Geography"],
    income: +d["Dollar"],
  }
}
