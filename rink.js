class IceRink {
    constructor(rinkWidth) {
        this.rinkWidth = rinkWidth;
        this.rinkHeight = this.rinkWidth * 2;
        this.negX = - this.rinkWidth / 2;
        this.posX = this.rinkWidth / 2;
        this.negY = - this.rinkHeight / 2;
        this.posY = this.rinkHeight / 2;
    }
    draw() {
        noFill();
        strokeWeight(5);

        // translate(width / 2, height / 2)

        // circle at center and horizontal blue lines
        this.blueStroke();
        // ellipse(width/2, height/2, 87.5, 87.5);
        ellipse(0, 0, 87.5, 87.5);
        // line(125, height / 2 - 87.5, 475, height / 2 - 87.5);
        line(this.negX, -87.5, this.posX, -87.5);
        // line(125, height / 2 + 87.5, 475, height / 2 + 87.5);
        line(this.negX, 87.5, this.posX, 87.5);

        // midddle red line
        this.redStroke();
        // line(125, height / 2, 475, height / 2);
        line(this.negX, 0, this.posX, 0);

        // blue point at center
        this.blueStroke();
        // point(width / 2, height / 2);
        point(0, 0);

        // outermost box
        // rect(125, 50, 350, 700);
        rect(this.negX, this.negY, this.rinkWidth, this.rinkHeight);
    }

    drawGrid() {
        translate(-width / 2, -height / 2); // 
        translate(width / 2, height / 2); // revert to original
    }

    blueStroke() {
        stroke(0, 50, 160); // blue rgb
    }

    redStroke() {
        stroke(196, 2, 43); // red rgb
    }

}