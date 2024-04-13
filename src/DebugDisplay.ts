import { Game } from "./Game";

class DebugDisplay {
  game: Game;
  context: CanvasRenderingContext2D;
  constructor(game: Game) {
    this.game = game;
    this.context = game.context;
  }

  frame (delta: number) {
    this.draw(delta);
  }
  draw (delta: number) {
    this.context.fillStyle = "white";
    this.context.font = "12px Arial";

    this.context.fillText(`FPS: ${Math.round(1000 / delta)}`, 0, 12);
  }
}

export {
  DebugDisplay
}