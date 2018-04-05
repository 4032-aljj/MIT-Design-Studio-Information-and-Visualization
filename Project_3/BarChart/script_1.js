function drawPlotOne () {
  const svg = d3.select('#plot-1')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 25
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom - 5
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))
    
//    y.domain([0, 125000])
    y.domain([0, d3.max(data, function (d) {
      return d.income
    })])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");
      
      
    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(5))
      .call(d3.axisLeft(y).ticks(5, "s"))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')
      

    // bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}

function drawPlotTwoBack () {
  const svg = d3.select('#plot-2')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
      .call(d3.axisLeft(y).ticks(5, "s"))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotTwoTop () {
  const svg = d3.select('#plot-2')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('incomeLess9.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    


    // x-axis
    // g.append('g')
    //   .attr('class', 'axis axis--x')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(x))

    // y-axis
    // g.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(d3.axisLeft(y).ticks(10))
    //   .append('text')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('y', 6)
    //   .attr('dy', '0.31em')
    //   .attr('text-anchor', 'end')
    //   .text('Income')

    // bars
    g.selectAll('.bar-less9')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-less9')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotThreeBack () {
  const svg = d3.select('#plot-3')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
//      .call(d3.axisLeft(y).ticks(5, "s"))
//      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotThreeTop () {
  const svg = d3.select('#plot-3')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('income9to12.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    

    // bars
    g.selectAll('.bar-9to12')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-9to12')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}



function drawPlotFourBack () {
  const svg = d3.select('#plot-4')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
//      .call(d3.axisLeft(y).ticks(5, "s"))
//      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotFourTop () {
  const svg = d3.select('#plot-4')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('incomeHighSchoolGrad.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    

    // bars
    g.selectAll('.bar-highschool')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-highschool')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}



function drawPlotFiveBack () {
  const svg = d3.select('#plot-5')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
//      .call(d3.axisLeft(y).ticks(5, "s"))
//      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotFiveTop () {
  const svg = d3.select('#plot-5')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('incomeSomeCollege.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    

    // bars
    g.selectAll('.bar-somecollege')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-somecollege')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotSixBack () {
  const svg = d3.select('#plot-6')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
//      .call(d3.axisLeft(y).ticks(5, "s"))
//      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotSixTop () {
  const svg = d3.select('#plot-6')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('associateDegree.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    

    // bars
    g.selectAll('.bar-associatedegree')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-associatedegree')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotSevenBack () {
  const svg = d3.select('#plot-7')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('aveIncome.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])

    // x-axis
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dx", "-.8em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-60)" )
      .style("text-anchor", "end")
      .attr("font-size", "8.5px");

    // y-axis
    g.append('g')
      .attr('class', 'axis axis--y')
//      .call(d3.axisLeft(y).ticks(10))
//      .call(d3.axisLeft(y).ticks(5, "s"))
//      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Income')

    // bars
    g.selectAll('.bar-lightgrey')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-lightgrey')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}


function drawPlotSevenTop () {
  const svg = d3.select('#plot-7')

  const margin = {
    top: 20,
    right: 25,
    bottom: 30,
    left: 29
  }

  const width = +svg.attr('width') - margin.left - margin.right
  const height = +svg.attr('height') - margin.top - margin.bottom
  const x = d3.scaleBand().rangeRound([0, width]).padding(0.2)
  const y = d3.scaleLinear().rangeRound([height, 0])
  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  d3.tsv('bachelorDegreeMore.csv', function (d) {
    d.income = +d.income
    return d
  }, function (error, data) {
    if (error) throw error

    x.domain(data.map(function (d) {
      return d.year
    }))

    y.domain([0, 125000])
    

    // bars
    g.selectAll('.bar-advancedegree')
      .data(data)
      .enter()
      .append('rect')
//      .attr('transform', `translate(10)`)
      .attr('class', 'bar-advancedegree')
      .attr('x', function (d) {
        return x(d.year)
      }).attr('y', function (d) {
        return y(d.income)
      }).attr('width', x.bandwidth()).attr('height', function (d) {
        return height - y(d.income)
      })
  })
}

drawPlotOne()
// drawPlotOne()
drawPlotTwoBack()
// drawPlotThree()
drawPlotTwoTop()
drawPlotThreeBack ()
drawPlotThreeTop ()
drawPlotFourBack ()
drawPlotFourTop ()
drawPlotFiveBack ()
drawPlotFiveTop ()
drawPlotSixBack ()
drawPlotSixTop ()
drawPlotSevenBack ()
drawPlotSevenTop ()