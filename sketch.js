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
  noFill();
  stroke(0, 50, 160);
  strokeWeight(10);
  // rect(125, 50, 350, 700, 87.5);
  // ellipse(x, y, 50, 50);
  //image(img, x, y, 54, 78);
  strokeWeight(5);
  line(125, height / 2 - 87.5, 475, height / 2 - 87.5);
  line(125, height / 2 + 87.5, 475, height / 2 + 87.5);
  ellipse(width/2, height/2, 87.5, 87.5);
  //red
  stroke(196, 2, 43);
  // middle red line
  line(125, height / 2, 475, height / 2);
  //blue
  stroke(0, 50, 160);
  //center point
  point(width / 2, height / 2);
  // outermost box
  rect(125, 50, 350, 700);



  checkForAcceleration();
  updatePosAndVelocity();
  checkCollisions(0.25);
  applyFriction(0.1);
  rotate_and_draw_image(x, y, 32, 46, 0);
}

function checkKeyPresses() {
  // if nothing is pressed, zamboni stays last direction it was heading

  // cancel ax and point up if both left and right

  // cancel ay and point up if both up and down
}

function checkForAcceleration() {
  // acceleration is zero unless keys are pressed
  ax = 0;
  ay = 0;

  //bools for easy logic
  let U = keyIsDown(UP_ARROW);
  let D = keyIsDown(DOWN_ARROW);
  let L = keyIsDown(LEFT_ARROW);
  let R = keyIsDown(RIGHT_ARROW);

  // Turn or thrust the ship depending on what key is pressed
  if (L && R) {
    ax = 0;
  }
  else if (L) {
    ax = -2;
    angle = 90;
  }
  else if (R) {
    ax = 2;
    angle = 270;
  }
  if (U && D) {
    ay = 0;
  }
  else if (U) {
    ay = -2;
    angle = 180;
  }
  else if (D) {
    ay = 2;
    angle = 0;
  }
  if (L && U) {
    angle = 135;
  }
  else if (L && D) {
    angle = 45;
  }
  else if (R && D) {
    angle = 315;
  }
  else if (R && U) {
    angle = 225;
  }
}

function updatePosAndVelocity() {
  // Update velocity
  vx += ax * dt;
  vy += ay * dt;

  // Update location
  x += vx * dt;
  y += vy * dt;
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

function rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}