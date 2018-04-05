// Plot constants
let edMargin = {t: 5, r: 25, b: 20, l: 25}
let edWidth = d3.select('.plot-ed').node().clientWidth - edMargin.r - edMargin.l
let edHeight = d3.select('.plot-ed').node().clientHeight - edMargin.t - edMargin.b
let edMapScale = Math.min(0.5, edWidth/960)
let edLegendW = Math.min(edWidth, 300)
let edLegendH = 20

// Append svgs to divs
let plotBeforeHS = appendEdPlot('#plot-before-hs')
let plotHSSome = appendEdPlot('#plot-hs-some')
let plotHSDiploma = appendEdPlot('#plot-hs-diploma')
let plotCollegeSome = appendEdPlot('#plot-college-some')
let plotBachelor = appendEdPlot('#plot-bachelor')
let plotAdvanced = appendEdPlot('#plot-advanced')

// Map path function
let edMapPath = d3.geoPath()

// Queue data files, parse them and use them
let edQueue = d3.queue()
  .defer(d3.csv, '../data/Additional/education_by_state_16.csv', parseEdData)
  .defer(d3.json, '../data/Additional/us_map.json')
  .await(edDataLoaded)

function edDataLoaded(err, data, map){
  // Dictionaries of ID to value
  let beforeHSByID = {}
  let HSSomeByID = {}
  let HSDiplomaByID = {}
  let collegeSomeByID = {}
  let bachelorByID = {}
  let advancedByID = {}

  // Populate dictionary values
  data.forEach(function(d){
    beforeHSByID[d.id] = d.before_hs
    HSSomeByID[d.id] = d.hs_some
    HSDiplomaByID[d.id] = d.hs_diploma
    collegeSomeByID[d.id] = d.college_some
    bachelorByID[d.id] = d.bachelor
    advancedByID[d.id] = d.advanced
  })

  // Domain extents
  let extentBeforeHS = d3.extent(data, function(d){ return d.before_hs })
  let extentHSSome = d3.extent(data, function(d){ return d.hs_some })
  let extentHSDiploma = d3.extent(data, function(d){ return d.hs_diploma })
  let extentCollegeSome = d3.extent(data, function(d){ return d.college_some })
  let extentAssociate = d3.extent(data, function(d){ return d.associate })
  let extentBachelor = d3.extent(data, function(d){ return d.bachelor })
  let extentAdvanced = d3.extent(data, function(d){ return d.advanced })

  // Color functions
  let colorBeforeHS = d3.scaleLinear()
    .domain(extentBeforeHS)
    .range(['#FFFFFF', '#FF6138'])

  let colorHSSome = d3.scaleLinear()
    .domain(extentHSSome)
    .range(['#FFFFFF', '#FFFF9D'])

  let colorHSDiploma = d3.scaleLinear()
    .domain(extentHSDiploma)
    .range(['#FFFFFF', '#BEEB9F'])

  let colorCollegeSome = d3.scaleLinear()
    .domain(extentCollegeSome)
    .range(['#FFFFFF', '#79BD8F'])

  let colorBachelor = d3.scaleLinear()
    .domain(extentBachelor)
    .range(['#FFFFFF', '#00A388'])

  let colorAdvanced = d3.scaleLinear()
    .domain(extentAdvanced)
    .range(['#FFFFFF', '#00A388'])

  // Append map charts to plots
  appendEdMap(map, plotBeforeHS, colorBeforeHS, beforeHSByID)
  appendEdMap(map, plotHSSome, colorHSSome, HSSomeByID)
  appendEdMap(map, plotHSDiploma, colorHSDiploma, HSDiplomaByID)
  appendEdMap(map, plotCollegeSome, colorCollegeSome, collegeSomeByID)
  appendEdMap(map, plotBachelor, colorBachelor, bachelorByID)
  appendEdMap(map, plotAdvanced, colorAdvanced, advancedByID)

  // Append legends to plots
  appendEdLegend(plotBeforeHS, extentBeforeHS, '#FF6138')
  appendEdLegend(plotHSSome, extentHSSome, '#FFFF9D')
  appendEdLegend(plotHSDiploma, extentHSDiploma, '#BEEB9F')
  appendEdLegend(plotCollegeSome, extentCollegeSome, '#79BD8F')
  appendEdLegend(plotBachelor, extentBachelor, '#00A388')
  appendEdLegend(plotAdvanced, extentAdvanced, '#00A388')
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

function appendEdPlot(plotID){
  let plot = d3.select(plotID)
    .append('svg')
    .attr('width', edWidth + edMargin.r + edMargin.l)
    .attr('height', edHeight + edMargin.t + edMargin.b)
  return plot
}

function appendEdMap(map, plot, color, values){
  plot.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(map, map.objects.states).features)
    .enter().append('path')
    .attr('d', edMapPath)
    .style('fill', function(d) {
      return color(values[d.id])
    })
    .style('stroke', '#AAAAAA')
    .attr('transform', `scale(${edMapScale})`)
}

function appendEdLegend(plot, extent, color){
  let legend = plot.append('defs')
    .append('svg:linearGradient')
    .attr('id', `gradient-${color}`)
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
    .attr('stop-color', color)
    .attr('stop-opacity', 1)

  plot.append('rect')
    .attr('width', edLegendW)
    .attr('height', edLegendH)
    .style('fill', `url(#gradient-${color})`)
    .attr('transform', `translate(${edWidth-edLegendW-10},${edHeight-edLegendH-10})`)

  let legendScale = d3.scaleLinear()
    .domain(extent)
    .range([0, edLegendW])

  let legendAxis = d3.axisBottom()
    .scale(legendScale)
    .ticks(5)
    .tickSizeOuter(0)
    .tickFormat(function(d) { return `${d}%` })

  plot.append('g')
    .attr('class', 'legend-axis')
    .attr('transform', `translate(${edWidth-edLegendW-10},${edHeight-10})`)
    .call(legendAxis)
}
