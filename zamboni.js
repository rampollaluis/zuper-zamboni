class Zamboni {
    constructor(x, y, imgPath) {
        this.x = x;
        this.y = y;
        
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;

        this.dt = 0.1;

        this.img = loadImage(imgPath)

        this.angle = 180;
    }

    update() {
        this.checkMovement();
        this.updatePosAndVelocity();
        this.checkCollisions(0.25);
        this.applyFriction(0.1);
        this.rotateAndDrawImage(this.x, this.y, 32, 46, 0);
    }

    rotateAndDrawImage(img_x, img_y, img_width, img_height, img_angle){
        imageMode(CENTER);
        translate(img_x+img_width/2, img_y+img_width/2);
        rotate(PI/180*this.angle);
        image(this.img, 0, 0, img_width, img_height);
        rotate(-PI / 180 * img_angle);
        translate(-(img_x+img_width/2), -(img_y+img_width/2));
        imageMode(CORNER);
      }

    checkMovement() {
        // acceleration is zero unless keys are pressed
        this.ax = 0;
        this.ay = 0;
      
        // set key codes for inputs
        let U = keyIsDown(87); // w
        let L = keyIsDown(65); // a
        let R = keyIsDown(68); // d
        let BRAKE = keyIsDown(32); // spacebar
      
        let angleChange = 0.75
      
        // Rotate if L or R, accel if U, or brake
        // Special cases: L && R cancel each other, U && BRAKE means slower brake, if BRAKE you also steer slightly faster
      
        if (U && BRAKE) {
          this.applyFriction(0.1);
        }
        else if (U) {
          this.ax = -1.5;
          this.ay = 1.5;
        }
        else if (BRAKE) {
          this.applyFriction(0.3);
          angleChange = 1;
        }
      
        if (L && !R) {
          this.angle-= angleChange;
        }
        if (R && !L) {
          this.angle+= angleChange;
        }
      }

      updatePosAndVelocity() {
        // Update velocity
        this.vx += this.ax * this.dt;
        this.vy += this.ay * this.dt;
      
        // Update location
        this.x += this.vx * this.dt * Math.sin(this.angle * (PI / 180));
        this.y += this.vy * this.dt * Math.cos(this.angle * (PI / 180));
      }

      applyFriction(frictionAmmount) {
        if (this.ax == 0 && this.vx != 0) {
          if (this.vx < 0) this.vx = this.vx + frictionAmmount;
          if (this.vx > 0) this.vx = this.vx - frictionAmmount;
        }
      
        if (this.ay == 0 && this.vy != 0) {
          if (this.vy < 0) this.vy = this.vy + frictionAmmount;
          if (this.vy > 0) this.vy = this.vy - frictionAmmount;
        }
      }

      checkCollisions(bounceBackRatio) {
        if (this.y < 0) {
            this.y = 0;
            this.vy = -this.vy * bounceBackRatio;
        }
        if (this.y > height - 78) {
            this.y = height - 78;
            this.vy = -this.vy * bounceBackRatio;
        }
        if (this.x < 0) {
            this.x = 0;
            this.vx = -this.vx * bounceBackRatio;
        }
        if (this.x > width - 54) {
            this.x = width - 54;
            this.vx = -this.vx * bounceBackRatio;
        }
      }
}