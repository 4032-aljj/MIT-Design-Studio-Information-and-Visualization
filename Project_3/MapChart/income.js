// Plot constants
let incomeMargin = {t: 5, r: 25, b: 20, l: 25}
let incomeWidth = d3.select('#plot-income').node().clientWidth - incomeMargin.r - incomeMargin.l
let incomeHeight = d3.select('#plot-income').node().clientHeight - incomeMargin.t - incomeMargin.b
let incomeMapScale = Math.min(1, incomeWidth/960)
let incomeLegendW = Math.min(incomeWidth, 600)
let incomeLegendH = 20

// Append svgs to divs
let plotIncome = d3.select('#plot-income')
  .append('svg')
  .attr('width', incomeWidth + incomeMargin.r + incomeMargin.l)
  .attr('height', incomeHeight + incomeMargin.t + incomeMargin.b)

// Map path function
let incomeMapPath = d3.geoPath()

// Queue data files, parse them and use them
let incomeQueue = d3.queue()
  .defer(d3.csv, '../data/Additional/income_by_state_16.csv', parseIncomeData)
  .defer(d3.json, '../data/Additional/us_map.json')
  .await(incomeDataLoaded)

function incomeDataLoaded(err, data, map){
  // Create dictionary of ID to value
  let incomeByID = {}
  data.forEach(function(d){
    incomeByID[d.id] = d.income
  })

  // Domain extent
  let extentIncome = d3.extent(data, function(d){ return d.income })

  // Color function
  let colorIncome = d3.scaleLinear()
    .domain(extentIncome)
    .range(['#FFFFFF', '#00A388'])

  // Append map chart to plot
  plotIncome.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(map, map.objects.states).features)
    .enter().append('path')
    .attr('d', incomeMapPath)
    .style('fill', function(d) {
      return colorIncome(incomeByID[d.id])
    })
    .style('stroke', '#AAAAAA')
    .attr('transform', `scale(${incomeMapScale})`)

  // Append legend to plot
  let legend = plotIncome.append('defs')
    .append('svg:linearGradient')
    .attr('id', 'gradient-income')
    .attr('x1', '0%')
    .attr('y1', '100%')
    .attr('x2', '100%')
    .attr('y2', '100%')
    .attr('spreadMethod', 'pad')

  legend.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#FFFFFF')
    .attr('stop-opacity', 1)

  legend.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#00A388')
    .attr('stop-opacity', 1)

  plotIncome.append('rect')
    .attr('width', incomeLegendW)
    .attr('height', incomeLegendH)
    .style('fill', 'url(#gradient-income)')
    .attr('transform', `translate(${incomeWidth-incomeLegendW-10},${incomeHeight-incomeLegendH-10})`)

  let legendScale = d3.scaleLinear()
    .domain(extentIncome)
    .range([0, incomeLegendW])

  let legendAxis = d3.axisBottom()
    .scale(legendScale)
    .ticks(5)
    .tickSizeOuter(0)
    .tickFormat(function(d) { return `$${d}` })

  plotIncome.append('g')
    .attr('class', 'legend-axis')
    .attr('transform', `translate(${incomeWidth-incomeLegendW-10},${incomeHeight-10})`)
    .call(legendAxis)
}

function parseIncomeData(d){
  return {
    id : d["Target Geo Id2"],
    state : d["Geography"],
    income: +d["Dollar"],
  }
}
