let zamboni;

function setup() {
  createCanvas(600, 800);
  zamboni = new Zamboni(width / 2, height / 2, "zamboni.png");
}

function draw() {
  background(220);
  drawIceRink();

  zamboni.update();
}

function drawIceRink() {
  noFill();
  strokeWeight(5);

  // circle at center and horizontal blue lines
  stroke(0, 50, 160); // change to blue
  ellipse(width/2, height/2, 87.5, 87.5);
  line(125, height / 2 - 87.5, 475, height / 2 - 87.5);
  line(125, height / 2 + 87.5, 475, height / 2 + 87.5);

  // midddle red line
  stroke(196, 2, 43); // change to red
  line(125, height / 2, 475, height / 2);

  // blue point at center
  stroke(0, 50, 160); // change to blue
  point(width / 2, height / 2);

  // outermost box
  rect(125, 50, 350, 700);
}