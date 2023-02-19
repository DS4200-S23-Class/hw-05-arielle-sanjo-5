// First, we need a frame  
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

//defining the scales
const xScale = d3.scaleLinear()
.range([MARGINS.left, FRAME_WIDTH - MARGINS.right]);

const yScale = d3.scaleLinear()
.range([FRAME_HEIGHT - MARGINS.bottom, MARGINS.top]);
   

d3.csv("data/scatter-data.csv").then((data) => { 
    xScale.domain([0, d3.max(data, d => d.x)]);
    yScale.domain([0, d3.max(data, d => d.y)]);

    // let's check our data
    console.log(data); //Notice this data has 2 columns
                        // to access data in a column, use .
  
    // add our dots with styling 
    FRAME1.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
            
          .attr("cx", (d) => { return xScale(d.x); }) // use x for cx
          .attr("cy", (d) => { return yScale(d.y); }) // use y for cy
          .attr("r", 7)  // set r 
          .attr("fill", "#0000FF"); // fill 
  
  }); // .then is closed here 

