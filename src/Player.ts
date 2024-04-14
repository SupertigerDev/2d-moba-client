import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";

class Player extends Entity {
  constructor(game: Game, x: number, y: number, options?: EntityOptions ) {
    super(game, x, y, options);
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