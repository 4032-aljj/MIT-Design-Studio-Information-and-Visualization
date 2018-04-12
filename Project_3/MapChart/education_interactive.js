// Plot constants
let edMargin = {t: 5, r: 25, b: 20, l: 25}
let edWidth = d3.select('.plot').node().clientWidth - edMargin.r - edMargin.l
let edHeight = d3.select('.plot').node().clientHeight - edMargin.t - edMargin.b
let edMapScale = Math.min(0.5, edWidth/760)
let edLegendW = Math.min(edWidth, 300)
let edLegendH = 20

// List of dictionaries {id: value}
let edValues = [
  {}, // Before high school
  {}, // Some high school
  {}, // High school diploma
  {}, // Some college
  {}, // Associate's
  {}, // Bachelor's
  {}, // Advanced
]

// List of domains [low, high]
let edDomains = []

// List of IDs for parsed data
let edDataLabels = ['before_hs','hs_some','hs_diploma','college_some','associate','bachelor','advanced']

// List of colors for education levels
let edColors = [
  ['#FFC538','#FF2238'],
  ['#FFFF9D','#5C5C39'],
  ['#CEFFAD','#38452F'],
  ['#A4FFC1','#294030'],
  ['#00E0BB','#004A3E'],
  ['#00E0BB','#004A3E'],
  ['#00E0BB','#004A3E'],
]

let edInitIndexLow = 0
let edInitIndexHigh = 6
let edNumScales = 6

// Append svgs to divs
let edPlot = d3.select('#plot-education')
  .append('svg')
  .attr('width', edWidth + edMargin.r + edMargin.l)
  .attr('height', edHeight + edMargin.t + edMargin.b)

let edLegendPlot = d3.select('#legend-education')
  .append('svg')
  .attr('width', edLegendW + 25)
  .attr('height', edLegendH + 20)

// Map variables
let edMapPath = d3.geoPath()
let edMap

// Legend variables
let edLegend

// Queue data files, parse them and use them
let edQueue = d3.queue()
  .defer(d3.csv, './data/Additional/education_by_state_16.csv', parseEdData)
  .defer(d3.json, './data/Additional/us_map.json')
  .await(edDataLoaded)

// Initialize the slider
let edSlider = document.getElementById('slider-education')
noUiSlider.create(edSlider, {
	range: {
		'min': 0,
		'max': 7
	},
  step: 1,
  margin: 1,
	start: [ edInitIndexLow, edInitIndexHigh ],
	connect: true,
	direction: 'ltr',
	orientation: 'horizontal',
	behaviour: 'tap',
})

// Add event listener to the slider
edSlider.noUiSlider.on('update', function(values, handle) {
  if (edMap) { colorEdMap(parseInt(values[0]), parseInt(values[1])) }
})

function edDataLoaded(err, data, map){
  // Initialize edDomains
  for (let i = 0; i < edValues.length; i++) {
    edDomains.push([100, 0])
  }

  // Populate edValues and edDomains
  data.forEach(function(d) {
    for (let i = 0; i < edValues.length; i++) {
      edValues[i][d.id] = d[edDataLabels[i]]
      edDomains[i][0] = Math.min(edDomains[i][0], d[edDataLabels[i]])
      edDomains[i][1] = Math.max(edDomains[i][1], d[edDataLabels[i]])
    }
  })

  // Append map charts to plots
  edMap = edPlot.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(map, map.objects.states).features)
    .enter().append('path')
    .attr('d', edMapPath)
    .style('stroke', '#AAAAAA')
    .attr('transform', `scale(${edMapScale})`)

  // Initialize the coloring and legend
  appendEdLegend()
  colorEdMap(edInitIndexLow, edInitIndexHigh)
}

function colorEdMap(indexLow, indexHigh) {
  // Define the range of total values
  let domainLow = 0
  let domainHigh = 0
  for (let i = indexLow; i < indexHigh; i++) {
    domainLow += edDomains[i][0]
    domainHigh += edDomains[i][1]
  }
  domainHigh = Math.min(100, domainHigh)

  // Create a new color scale
  let color = d3.scaleLinear()
    .domain([0, edNumScales-1])
    .range([edColors[indexHigh-1][0], edColors[indexHigh-1][1]])
  let unit = (domainHigh - domainLow)/edNumScales

  // Update the fill function of map
  edMap.style('fill', function(d) {
    if (indexLow == 0 && indexHigh == 7) { return color(edNumScales) }
    let sum = 0
    for (let i = indexLow; i < indexHigh; i++) {
      sum += edValues[i][d.id]
    }
    return color(Math.floor((sum-domainLow)/unit))
  })

  // Update the slider color
  $('#slider-education .noUi-connect').css('background-color', color(edNumScales/2))
  $('#slider-income .noUi-connect').css('background-color', color(edNumScales/2))

  // Update the legend
  updateEdLegend(domainLow, domainHigh, color(domainLow), color(domainHigh))

  // Update the income map color
  colorIncomeMap()
}

function updateEdLegend(domainLow, domainHigh, colorLow, colorHigh) {
  // Update the gradient range
  edLegend.select("#gradient-ed-low").attr('stop-color', colorLow)
  edLegend.select("#gradient-ed-high").attr('stop-color', colorHigh)

  // Create new scale and axis
  let legendScale = d3.scaleLinear()
    .domain([domainLow, domainHigh])
    .range([0, edLegendW])

  let legendAxis = d3.axisBottom()
    .scale(legendScale)
    .ticks(5)
    .tickSizeOuter(0)
    .tickFormat(function(d) { return `${d}%` })

  // Update the axis
  edLegendPlot.selectAll("g.legend-axis").remove()
  edLegendPlot.append('g')
    .attr('class', 'legend-axis')
    .attr('transform', `translate(10, ${edLegendH})`)
    .call(legendAxis)
}

function appendEdLegend() {
  edLegend = edLegendPlot.append('defs')
    .append('svg:linearGradient')
    .attr('id', 'gradient-ed')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '100%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad')

  edLegend.append('stop')
    .attr('id', 'gradient-ed-low')
    .attr('offset', '0%')
    .attr('stop-color', '#FFF')
    .attr('stop-opacity', 1)

  edLegend.append('stop')
    .attr('id', 'gradient-ed-high')
    .attr('offset', '100%')
    .attr('stop-color', '#FFF')
    .attr('stop-opacity', 1)

  edLegendPlot.append('rect')
    .attr('width', edLegendW)
    .attr('height', edLegendH)
    .style('fill', 'url(#gradient-ed)')
    .attr('transform', `translate(10, 0)`)
}

function parseEdData(d){
  return {
    id : d["Id2"],
    state : d["Geography"],
    before_hs: +d["Percent; Estimate; Population 25 years and over - Less than 9th grade"],
    hs_some: +d["Percent; Estimate; Population 25 years and over - 9th to 12th grade, no diploma"],
    hs_diploma: +d["Percent; Estimate; Population 25 years and over - High school graduate (includes equivalency)"],
    college_some: +d["Percent; Estimate; Population 25 years and over - Some college, no degree"],
    associate: +d["Percent; Estimate; Population 25 years and over - Associate's degree"],
    bachelor: +d["Percent; Estimate; Population 25 years and over - Bachelor's degree"],
    advanced: +d["Percent; Estimate; Population 25 years and over - Graduate or professional degree"],
  }
}
