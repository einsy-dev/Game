export class Shot {
  speed = 20;
  constructor(x, y, radius, color, field) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    Object.assign(this, field);
    if (this.x > this.canvas.width / 2) {
      this.speed = -this.speed;
    }
  }

  draw() {
    this.x += this.speed;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}