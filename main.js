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

//bar plot
const FRAME2 = d3.select("#vis2") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

//read in data for bar plot
d3.csv("data/bar-data.csv").then((data) => {

    //build bar plot inside of .then
    //find max X by returning "category"
      const MAX_X_BAR = d3.max(data, (d) => {return (d.category); });
    //find max Y by returning "amount" as an int
      const MAX_Y_BAR = d3.max(data, (d) => {return parseInt(d.amount);});

    //domain and range
      //use scaleBand() because category is nominal  
      const X_SCALE_BAR = d3.scaleBand()
                          //domain are "category" variables
                          .domain(data.map(function(d) {return d.category;}))
                          .range([0, VIS_WIDTH]).padding(0.5);
      //use scaleLinear() because amount is quantitative and bar length should be proportional to value
      const Y_SCALE_BAR = d3.scaleLinear()
                          .domain(MAX_Y_BAR)
                          .range(0, VIS_HEIGHT)

}

      //add our bars with styling
      FRAME2.selectAll("bar")
        .data(data)// this is passed from .then()
        .enter()
        .append("bars")
          .attr("class", "point") //add class
          .attr("cx")

