// Plot constants
let incomeMargin = {t: 5, r: 25, b: 20, l: 25}
let incomeWidth = d3.select('#plot-income').node().clientWidth - incomeMargin.r - incomeMargin.l
let incomeHeight = d3.select('#plot-income').node().clientHeight - incomeMargin.t - incomeMargin.b
let incomeMapScale = Math.min(1, incomeWidth/960)

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
}

function parseIncomeData(d){
  return {
    id : d["Target Geo Id2"],
    state : d["Geography"],
    income: +d["Dollar"],
  }
}
