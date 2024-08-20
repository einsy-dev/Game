import './App.css';

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const field = new Field();
    const player = new Player(60, 60, 50, 'red', field);
    const player2 = new Player(1540, 60, 50, 'blue', field);

    field.start(player, player2);

    return () => {
      field.stop();
    }
  }, []);

  return (
    <canvas id="canvas" width="1600" height="900"></canvas>
  );
}

class Field {
  #interval = null;
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  start(...el) {
    this.#interval = setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      el.forEach(element => {
        element.draw();
      });
    }, 10);
  }

  stop() {
    clearInterval(this.#interval);
    this.#interval = null;
  }

}


class Player {
  #interval = null;
  speed = 5;
  constructor(x, y, radius, color, field) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    Object.assign(this, field);
    this.canvas.addEventListener('mousemove', e => {
      this.mX = e.clientX - this.canvas.offsetLeft;
      this.mY = e.clientY - this.canvas.offsetTop;
    })
    this.move();
  }

  checkCollision(x, y) {
    if (Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)) < this.radius) {
      this.speed = -this.speed;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    if (this.#interval) return;
    this.#interval = setInterval(() => {
      if (this.y - this.radius + this.speed > 0 && this.y + this.radius + this.speed < this.canvas.height) {
        this.y += this.speed;
      } else {
        this.speed = -this.speed;
      }
      this.checkCollision(this.mX, this.mY);
    }, 10);
    this.draw();
  }

  stop() {
    clearInterval(this.#interval);
    this.#interval = null;
  }
}
