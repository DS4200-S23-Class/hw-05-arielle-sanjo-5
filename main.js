// First, we need a frame  
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// This time, let's define a function that builds our plot
function build_interactive_plot() {


  d3.csv("data/scatter-data.csv").then((data) => { 
    // make the domains go from 0 to 10 for the ticks

    // Build plot inside of .then 
    // find max X
    const MAX_X1 = d3.max(data, (d) => { return parseInt(d.x); });

    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
    const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, 10]) // add some padding  
                      .range([0, VIS_WIDTH]); 

    const Y_SCALE1 = d3.scaleLinear() 
    .domain([0, 10]) // add some padding  
    .range([VIS_HEIGHT, 0]); 

    // add our dots with styling 
    FRAME1.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
          .attr("class", "point") // add class
          .attr("cx", (d) => { return X_SCALE1(d.x) + MARGINS.left }) // use x for cx
          .attr("cy", (d) =>{ return Y_SCALE1(d.y) + MARGINS.bottom; }) // use y for cy
          .attr("r", 7)  // set r 
          .attr("fill", "#0000FF"); // fill 
        

       // Add an x axis to the vis  
       FRAME1.append("g") 
       .attr("transform", "translate(" + MARGINS.left + 
             "," + (VIS_HEIGHT + MARGINS.top) + ")") 
       .call(d3.axisBottom(X_SCALE1).ticks(10)) 
         .attr("font-size", '20px'); 

      // add a y axis to the vis
      FRAME1.append("g") 
      .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
      .call(d3.axisLeft(Y_SCALE1).ticks(10)) 
        .attr("font-size", '20px'); 


    // getting the coordinates of a circle when you click on it
    const rightColumn = document.querySelector(".right-column");

    // Function that handles click event on the points in the left column and the right column
    function handlePointClick(event) {
      // Get the point that was clicked
      const point = event.target;

      // toggle selected class for the point that was clicked
      point.classList.toggle("selected");

      // add/remove border class for the point that was
      if (point.classList.contains("selected")) {
        point.classList.add("border");
      } else {
        point.classList.remove("border");
      }
      
      // remove any previously added coordinates in the right column
      const oldCoordinates = rightColumn.querySelectorAll('.coordinate');
      oldCoordinates.forEach(old => old.remove());

      // get the selected coordinates
      const x = point.getAttribute("cx");
      const y = point.getAttribute("cy");

      // create a new paragraph element with the selected coordinates
      const newCoordinates = document.createElement('p');
      newCoordinates.classList.add('coordinate');
     

  newCoordinates.innerHTML = `Selected Coordinate: (${x}, ${y})`;

  // add the new paragraph to the beginning of the right column
  rightColumn.insertBefore(newCoordinates, rightColumn.firstChild);
  }

  // get the points in the left column
  const points = document.querySelectorAll(".point");

  // adds event listener for clicking each point
  points.forEach(point => point.addEventListener("click", handlePointClick));


  // add event listener to the form in html code
  const form = document.querySelector("form");

  form.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default action

  // Get the select element inside the form
  var select = this.querySelectorAll("select");

  // Loop through the select elements and get the selected value
  for (var i = 0; i < select.length; i++) {
    if (select[i].value !== "0") {
      // remove any previously added coordinates in the right column
      const oldCoordinates = rightColumn.querySelectorAll('.coordinate');
      oldCoordinates.forEach(old => old.remove());

      // create a new paragraph element with the selected coordinate
      const newCoordinates = document.createElement('p');
      newCoordinates.classList.add('coordinate');
      newCoordinates.innerHTML = `Selected Coordinate ${i+1}: ${select[i].value}`;

      // add the new paragraph to the beginning of the right column
      rightColumn.insertBefore(newCoordinates, rightColumn.firstChild);
    }
  }
  });
;

function addCircle() {
  // Get the x and y values entered by the user
  /// Get the x and y values entered by the user
  const xValue = document.querySelector("#x").value;
  const yValue = document.querySelector("#y").value;
  
  // Create a new circle element and add it to the plot
  FRAME1.append("circle")
    .attr("class", "point") // add class
    .attr("cx", X_SCALE1("xValue") + MARGINS.left) // use x for cx
    .attr("cy", Y_SCALE1("yValue") + MARGINS.bottom) // use y for cy
    .attr("r", 7) // set r
    .attr("fill", "#0000FF") // fill 
   
  // add event listener to the new circle
  const newCircle = FRAME1.select(":last-child");
  newCircle.on("click", handlePointClick); 

  // Add event listener to the "Add Circle" button
const addCircleButton = document.querySelector("#add-circle");
}


  // Add event listeners
  FRAME1.selectAll(".point")
  .on("selected", handlePointClick)
  .on("click", addCircle());  
  

   
  });
}

  // call function
build_interactive_plot();










const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// This time, let's define a function that builds our plot
function build_interactive_plot() {

  d3.csv("data/bar-data.csv.csv").then((data) => {

    // Build plot inside of .then 
    // find max X
    const BAR_MAX_X = d3.max(data, (d) => { return parseInt(d.category); });

    // find max Y
    const BAR_MAX_Y = d3.max(data, (d) => { return parseInt(d.amount); });
    
    // Define scale functions that maps our data values (domain) to pixel values (range)
    const BAR_X_SCALE = d3.scaleLinear() 
                      .domain([0,100]) // add some padding 
                      .range([0, VIS_WIDTH]); 

    const BAR_Y_SCALE = d3.scaleLinear() 
                      .domain([0, (BAR_MAX_Y)]) // add some padding  
                      .range([0, VIS_HEIGHT]); 


    // Use X_SCALE to plot our bars
    FRAME2.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rectangle")  
          .attr("x", (d) => { return (BAR_X_SCALE(d.category) + MARGINS.left); }) 
          .attr("y", (d) => {return (BAR_Y_SCALE(d.amount) + MARGINS.top) 
          .attr("class", "bars");

    // Tooltip

     // To add a tooltip, we will need a blank div that we 
    //  fill in with the appropriate text. Be use to note the
    //  styling we set here and in the .css
    const TOOLTIP = d3.select("#vis3")
                        .append("div")
                          .attr("class", "tooltip")
                          .style("opacity", 0); 

    // Define event handler functions for tooltips
    function handleMouseover(event, d) {
      // on mouseover, make opaque 
      TOOLTIP.style("opacity", 1); 
      
    }

    function handleMousemove(event, d) {
      // position the tooltip and fill in information 
      TOOLTIP.html("Name: " + d.name + "<br>Value: " + d.x)
              .style("left", (event.pageX + 10) + "px") //add offset
                                                          // from mouse
              .style("top", (event.pageY - 50) + "px"); 
    }

    function handleMouseleave(event, d) {
      // on mouseleave, make transparant again 
      TOOLTIP.style("opacity", 0); 
    } 

    // Add event listeners
    FRAME3.selectAll(".point")
          .on("mouseover", handleMouseover) //add event listeners
          .on("mousemove", handleMousemove)
          .on("mouseleave", handleMouseleave);    

    // Add an axis to the vis  
    FRAME3.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 


  });
}

// Call function 
build_interactive_plot();


