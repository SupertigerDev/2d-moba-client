import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";


class Tower extends Entity {
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
  Tower
}