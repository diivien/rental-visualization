"use strict";

// Load CSV file
d3.csv("data/scatter_data.csv", d3.autoType).then(function (data) {
  // Larger circles overlap or cover smaller circles. Sort the countries by population before drawing them.
  // Analyze the dataset in the web console
  width = 900;
  height = 500;
  margin = {
    top: 10,
    right: 100,
    bottom: 30,
    left: 50
  }; // Append a new SVG area with D3 and add in the scatterplot

  xScale = d3.scaleLinear(d3.extent(data, function (d) {
    return d.revenues_mm;
  }), [margin.left, width - margin.right]);
  yScale = d3.scaleLinear(d3.extent(data, function (d) {
    return d.profit_mm;
  }), [height - margin.bottom, margin.top]);
  colors = d3.scaleOrdinal().range(d3.schemeCategory10);
  xAxis = d3.axisBottom(xScale);
  yAxis = d3.axisLeft(yScale); //Create scale functions. 

  var g = d3.select('.chart').append('g').style('font-family', 'sans-serif').style('font-size', 10);
  g.selectAll('g').data(data) // each data point is a group
  .join('g').attr('class', 'scatter-point').attr('transform', function (d) {
    return "translate(".concat(xScale(d.revenues_mm), ",").concat(yScale(d.profit_mm), ")");
  }) // .call() passes in the current d3 selection
  // This is great if we want to append something
  // but still want to work with the original selection after that
  .call(function (g) {
    return g // first we append a circle to our data point
    .append('circle').attr('r', 5).style('stroke', function (d) {
      return colors(d.category);
    }).style('stroke-width', 2).style('fill', 'transparent');
  }).call(function (g) {
    return g // then we append a text label to the data point
    .append('text').attr('x', 8).attr('dy', '0.35em') // I've filter out values too low in order to avoid label overlap
    // see what happens if you remove the condition and just return d.company
    .text(function (d) {
      return d.revenues_mm < 10000 ? '' : d.company;
    });
  });
  d3.select('.chart').append('g').attr('class', 'y-axis').attr('transform', "translate(".concat(margin.left, ",0)")).call(yAxis) // remove the line between the ticks and the chart
  .select('.domain').remove();
  d3.select('.chart').append('g').attr('class', 'x-axis').attr('transform', "translate(0,".concat(height - margin.bottom, ")")).call(xAxis) // remove the line between the ticks and the chart
  .select('.domain').remove(); // Here, I'm appending and positioning the y-axis label (Profit ($MM))

  g.append('g').attr('transform', "translate(".concat(margin.left + 6, ",").concat(margin.top + 4, ")")).append('text').attr('transform', 'rotate(90)').text(data.y); // Here, I'm appending and positioning the x-axis label (Revenue ($MM))

  g.append('text').attr('x', width - margin.right - 6).attr('y', height - margin.bottom - 5).attr('text-anchor', 'end').text(data.x); // Add in x-, y- axis and r (radius)
  // Color palette
  // Create group element
  // Draw the axis
});