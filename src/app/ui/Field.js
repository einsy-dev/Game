import { Shot } from './Shot';

export class Field {
	#interval = null;
	constructor(setCount) {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.setCount = setCount;
	}

	start(player, player2) {
		this.#interval = setInterval(() => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			[player, player2].forEach(element => {
				element.draw();
				element.fire?.draw();
			});
			if (collision(player.fire.x, player.fire.y, player2.x, player2.y, player2.radius)) {
				player.fire = new Shot(player.x, player.y, 10, player.color, player.field);
				this.setCount(prev => [prev[0], prev[1] + 1]);
			} else if (collision(player2.fire.x, player2.fire.y, player.x, player.y, player.radius)) {
				player2.fire = new Shot(player2.x, player2.y, 10, player2.color, player2.field);
				this.setCount(prev => [prev[0] + 1, prev[1]]);
			} else if (collision(player.fire.x, player.fire.y, player2.fire.x, player2.fire.y, player2.fire.radius)) {
				player.fire = new Shot(player.x, player.y, 10, player.color, player.field);
				player2.fire = new Shot(player2.x, player2.y, 10, player2.color, player2.field);
			}
		}, 8);
	}

	stop() {
		clearInterval(this.#interval);
		this.#interval = null;
	}
}
function collision(x, y, x2, y2, radius) {
	if ((x < x2 + radius && x > x2 - radius) &&
		(y < y2 + radius && y > y2 - radius)) return true;
	else return false;
}
