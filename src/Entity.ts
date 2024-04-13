import { Game } from "./Game";

class Entity {
  game: Game;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;
  velocitySpeed: number;
  velocity: number;
  grounded: boolean;


  constructor(game: Game) {
    this.game = game;
    this.context = game.context;

    this.x = 0;
    this.y = 0;

    this.width = 50;
    this.height = 100;

    this.velocitySpeed = 0.009;
    this.velocity = 0;

    this.grounded = false;

  }

  frame (delta: number) {
    this.update(delta);
    this.draw();
  }
  update(delta: number) {
    this.updateGravity(delta)

    if ((this.game.keyboard.keys.SPACE || this.game.keyboard.keys.W) && this.grounded ) {
      this.y -= 1;
      this.velocity = -2;
      this.grounded = false
    }

    if (this.game.keyboard.keys.D) {
      this.x += (this.game.keyboard.keys.SHIFT ? 2 : 1) * delta;
      this.grounded = false
    }

    if (this.game.keyboard.keys.A) {
      this.x -= (this.game.keyboard.keys.SHIFT ? 2 : 1) * delta;
      this.grounded = false
    }

  }
  draw () {
    this.context.fillStyle = "green";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
  updateGravity(delta: number) {
    if (this.grounded) return;
    this.velocity += this.velocitySpeed * delta;
    let newY = this.y + this.velocity * delta;
    const collidedTile = this.game.Map.isCollidingY(this.x, newY + this.height);
    if (collidedTile) {
      this.y = collidedTile[2] - this.height;
      this.velocity = 0;
      this.grounded = true;
      return;
    }
    this.y = newY;
  }
}

export {
  Entity
}