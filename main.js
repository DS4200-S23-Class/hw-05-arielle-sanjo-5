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
      const x = point.__data__.x;
       const y = point.__data__.y;

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



  

   
  });
}

  // call function
build_interactive_plot();


function addCircle() {
  // Get the x and y coordinates from the input fields
  var x = Number(document.getElementById("x").value);
  var y = Number(document.getElementById("y").value);
  console.log(x)
  console.log(y)
  const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, 10]) // add some padding  
                      .range([0, VIS_WIDTH]); 

  const Y_SCALE1 = d3.scaleLinear() 
                    .domain([0, 10]) // add some padding  
                    .range([VIS_HEIGHT, 0]);

   

      function handlePointClick(event) {
        // Get the point that was clicked
        // getting the coordinates of a circle when you click on it
        const rightColumn = document.querySelector(".right-column");
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
        const x = point.__data__.x;
        const y = point.__data__.y;
  
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
            
FRAME1.append("circle")
.attr("class", "point") // add class
.attr("cx",X_SCALE1(x)+ MARGINS.left ) // use x for cx
.attr("cy", Y_SCALE1(y) + MARGINS.bottom) // use y for cy
.attr("r", 7)  // set r 
.attr("fill", "#0000FF") // fill
.on("click", handlePointClick); // add click event listener

}
