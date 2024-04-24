import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";
import { Projectile } from "./Projectile";


class Tower extends Entity {
  projectile: Projectile | undefined;
  constructor(game: Game, x: number, y: number, options?: EntityOptions ) {
    super(game, x, y, 200, 300, options);

    this.targetEnemy = this.game.player;



  
    
    
    setInterval(() => {
      if (!this.targetEnemy) return;
      const rotation = this.enemyShootRotation();
      if (rotation === undefined) return;
      this.projectile = new Projectile(this.game, this.x, this.y, rotation);
    }, 1000);

  }


  frame(delta: number): void {
    super.frame(delta);

    this.projectile?.frame(delta);
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