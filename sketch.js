x = 0;
y = 0;

vx = 0;
vy = 0;

ax = 0;
ay = 0;

dt = 0.1;

let img;

let angle = 180;

function setup() {
  createCanvas(600, 800);
  img = loadImage("zamboni.png");
  x = width / 2;
  y = height/ 2;
}

function draw() {
  background(220);
  drawIceRink();

  checkMovement();
  updatePosAndVelocity();
  checkCollisions(0.25);
  applyFriction(0.1);
  rotateAndDrawImage(x, y, 32, 46, 0);
}

function checkMovement() {
  // acceleration is zero unless keys are pressed
  ax = 0;
  ay = 0;

  // set key codes for inputs
  let U = keyIsDown(87); // w
  let L = keyIsDown(65); // a
  let R = keyIsDown(68); // d
  let BRAKE = keyIsDown(32); // spacebar

  // Rotate if L or R, accel if U, or brake
  // Special cases: L && R cancel each other, U && BRAKE means slower brake
  if (L && !R) {
    angle-= 0.75;
  }
  if (R && !L) {
    angle+= 0.75;
  }

  if (U && BRAKE) {
    applyFriction(0.1);
  }
  else if (U) {
    ax = -1.5;
    ay = 1.5;
  }
  else if (BRAKE) {
    applyFriction(0.3);
  }
}

function updatePosAndVelocity() {
  // Update velocity
  vx += ax * dt;
  vy += ay * dt;

  // Update location
  x += vx * dt * Math.sin(angle * (PI / 180));
  y += vy * dt * Math.cos(angle * (PI / 180));
}

function applyFriction(frictionAmmount) {
  if (ax == 0 && vx != 0) {
    if (vx < 0) vx = vx + frictionAmmount;
    if (vx > 0) vx = vx - frictionAmmount;
  }

  if (ay == 0 && vy != 0) {
    if (vy < 0) vy = vy + frictionAmmount;
    if (vy > 0) vy = vy - frictionAmmount;
  }
}

function checkCollisions(bounceBackRatio) {
  if (y < 0) {
    y = 0;
    vy = -vy * bounceBackRatio;
  }
  if (y > height - 78) {
    y = height - 78;
    vy = -vy * bounceBackRatio;
  }
  if (x < 0) {
    x = 0;
    vx = -vx * bounceBackRatio;
  }
  if (x > width - 54) {
    x = width - 54;
    vx = -vx * bounceBackRatio;
  }
}

function rotateAndDrawImage(img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
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