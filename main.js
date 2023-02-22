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


//build frame for bar chart
const FRAME2 = d3.select("#vis2") 
.append("svg") 
.attr("height", FRAME_HEIGHT)   
.attr("width", FRAME_WIDTH)
.attr("class", "frame"); 

function build_interactive_barchart() {
  //build bar plot inside of .then
  d3.csv("data/bar-data.csv").then((data) => {
      //find max X by returning "category"
    const MAX_X_BAR = d3.max(data, (d) => {return (d.category)});
      //find max Y by returning "amount" as an int
    const MAX_Y_BAR = d3.max(data, (d) => {return parseInt(d.amount)});

    //domain and range

    //use scaleBand() because category is nominal  
    const X_SCALE_BAR = d3.scaleBand()
    //domain are "category" variables
    .domain(data.map(function(d) {return d.category}))
    .range([0, VIS_WIDTH]).padding(0.5);

    //use scaleLinear() because amount is quantitative and bar length should be proportional to value
    const Y_SCALE_BAR = d3.scaleLinear()
    .domain(0, MAX_Y_BAR + 10)
    //take height as first parameter as coordinates start from top left
    .range(VIS_HEIGHT, 0);

    //bars with styling
    FRAME2.selectAll("bars")
    
    //this is passed from .then()
    .data(data)
    .enter()
    .append("rect")
            .attr("class", "rect") //add class
            .attr("x", (d) => { return X_SCALE_BAR(d.category) + MARGINS.left }) // use d.category for x
            .attr("y", (d) =>{ return Y_SCALE_BAR(d.amount) + MARGINS.top; }) // use d.amount for y
            .attr("width", X_SCALE_BAR.bandwidth())//width
            .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE_BAR(d.amount); });//height

          // Add an x axis to the vis. 7 ticks because there's 7 letters
            FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE_BAR).ticks(7)) 
            .attr("font-size", '20px'); 

          // add a y axis to the vis, 10 ticks because equally split from 0-100
            FRAME2.append("g") 
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
            .call(d3.axisLeft(Y_SCALE_BAR).ticks(10)) 
            .attr("font-size", '20px');

          //tooltip
            const TOOLTIP = d3.select("#vis2")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0); 

          //define event handler functions for tooltips
            function handleMouseover(event, d) {
          //on mouseover, make opaque 
              TOOLTIP.style("opacity", 1);

            }

          //moving the mouse
            function handleMousemove(event, d) {
          //position the tooltip and fill in information 
              TOOLTIP.html("Category: " + d.category + "<br>Amount: " + d.amount)
              .style("left", (event.pageX + 10) + "px") //add offset from mouse
              .style("top", (event.pageY - 50) + "px")
            }

          //on mouseleave, make transparent again 
            function handleMouseleave(event, d) { 
              TOOLTIP.style("opacity", 0)

            } 

          //add event listeners
            FRAME2.selectAll(".bar")
            .on("mouseover", handleMouseover) 
            .on("mousemove", handleMousemove)
            .on("mouseleave", handleMouseleave);    


          });
}
          build_interactive_barchart();

