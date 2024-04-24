import { Game } from "./Game";

export class Projectile {
  game: Game;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  constructor(game: Game, x: number, y: number, rotation: number) {
    this.game = game;
    this.context = game.context;

    this.x = x;
    this.y = y;

    this.rotation = rotation;

    this.speed = 3;
  }
  frame (delta: number) {
    this.update(delta);
    this.draw();
  }

  update(delta: number) {

    // move the projectile based on rotation and speed
    this.x += Math.cos(this.rotation) * this.speed * delta;
    this.y += Math.sin(this.rotation) * this.speed * delta;


  }

  draw () {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);

    this.context.fillStyle = "red";
    // draw a line from the tower to the player
    this.context.fillRect(0, 0, 30, 5);
    this.context.restore();
  }


}