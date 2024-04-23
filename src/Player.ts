import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";

class Player extends Entity {
  constructor(game: Game, x: number, y: number, options?: EntityOptions ) {
    super(game, x, y, 50, 100, options);
  }

  update(delta: number) {
    super.update(delta);  
  }

  draw () {
    super.draw()
  }
}

export {
  Player
}