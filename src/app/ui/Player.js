import { Shot } from './Shot.js';

export class Player {
	speed = 8;

	constructor(x, y, radius, color, field) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.field = field;
		Object.assign(this, field);

		this.fire = new Shot(this.x, this.y, 10, color, field);
		this.canvas.addEventListener('mousemove', e => {
			this.mX = e.clientX - this.canvas.offsetLeft;
			this.mY = e.clientY - this.canvas.offsetTop;
		})

		this.canvas.addEventListener('click', e => {
			if ((this.mX > this.x - this.radius && this.mX < this.x + this.radius) &&
				(this.mY > this.y - this.radius && this.mY < this.y + this.radius)) {
				console.log('click');
			}
		})
	}

	draw() {
		this.move();
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.closePath();
	}

	move() {
		if (this.y - this.radius + this.speed > 0 && this.y + this.radius + this.speed < this.canvas.height) {
			this.y += this.speed;
		} else {
			this.speed = -this.speed;
		}
		if (Math.sqrt(Math.pow(this.x - this.mX, 2) + Math.pow(this.y - this.mY, 2)) < this.radius) {
			this.speed = -this.speed;
		}
		if (this.fire.x < 0 || this.fire.x > this.canvas.width) {
			this.fire = new Shot(this.x, this.y, 10, this.color, this.field);
		}
	}

}