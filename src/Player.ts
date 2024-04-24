import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";

class Player extends Entity {
  constructor(game: Game, x: number, y: number, options?: EntityOptions ) {
    super(game, x, y, 50, 100, options);
  

    // setTimeout(() => {
    //   this.targetEnemy = this.game.tower;
    // }, 100);

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