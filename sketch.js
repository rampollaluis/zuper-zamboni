let zamboni;
let iceRink;

function setup() {
  createCanvas(600, 800);
  iceRink = new IceRink(350);
  zamboni = new Zamboni(0, 0, "zamboni.png", iceRink);
}

function draw() {
  background(220);
  translate(width / 2, height / 2)
  iceRink.draw();
  zamboni.update();
}