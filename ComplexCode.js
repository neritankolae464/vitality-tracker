/*
   Filename: ComplexCode.js
   Content: A complex JavaScript code demonstrating a data visualization project using D3.js library.
*/

// Import the D3.js library
import * as d3 from 'd3';

// Constants for visualization
const width = 800;
const height = 600;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

// Create SVG element
const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Load data from a CSV file
d3.csv('data.csv', (data) => {
  // Data preprocessing
  const parsedData = data.map(d => ({
    x: +d.x,
    y: +d.y,
    color: d.color
  }));

  // Create scales for x and y axis
  const xScale = d3.scaleLinear()
    .domain(d3.extent(parsedData, d => d.x))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(parsedData, d => d.y))
    .range([height, 0]);

  // Create axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Append axes to SVG
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

  // Create scatterplot circles
  svg.selectAll('circle')
    .data(parsedData)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 5)
    .attr('fill', d => d.color);

  // Add tooltips to circles
  svg.selectAll('circle')
    .on('mouseover', (event, d) => {
      const tooltip = d3.select('.tooltip');

      tooltip.style('top', `${event.pageY}px`)
        .style('left', `${event.pageX}px`)
        .style('display', 'inline-block')
        .html(`<b>X:</b> ${d.x}<br/><b>Y:</b> ${d.y}`);
    })
    .on('mouseout', () => {
      const tooltip = d3.select('.tooltip');
      tooltip.style('display', 'none');
    });

  // Add a title to the chart
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -margin.top)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('text-decoration', 'underline')
    .text('Scatterplot of X vs Y');
});

// Add a tooltip element
d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('padding', '10px')
  .style('background-color', '#fff')
  .style('border', '1px solid #ccc')
  .style('display', 'none');
  
// ... (additional code goes here)
// ... (more elaborate and complex code beyond this point)