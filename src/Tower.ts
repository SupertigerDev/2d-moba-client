import { Entity, EntityOptions } from "./Entity";
import { Game } from "./Game";
import { Player } from "./Player";


class Tower extends Entity {
  player: Player
  constructor(game: Game, x: number, y: number, options?: EntityOptions ) {
    super(game, x, y, 200, 300, options);

    this.player = this.game.player
  }

  update(delta: number) {
    super.update(delta);  


  }

  draw () {
    super.draw()
    
    const closestXEnemy = closestSideDistance({height: this.height, width: this.width, x: this.x, y: this.y}, {height: this.player.height, width: this.player.width, x: this.player.x, y: this.player.y});
    const enemyWidth = this.player.width;
    const enemyShootPosX = this.player.x + (closestXEnemy === "left" ? 0 : enemyWidth);
    const enemyShootPosY = this.player.y + (enemyWidth / 2);



    const closestXTower = closestSideDistance({height: this.height, width: this.width, x: this.x, y: this.y}, {height: this.player.height, width: this.player.width, x: this.player.x, y: this.player.y});


    const shootPosX = this.x + (closestXTower === "left" ?  this.width : 0);
    const shootPosY = this.y + (this.height / 4);
    const rotation = Math.atan2(enemyShootPosY - shootPosY, enemyShootPosX - shootPosX);

    this.context.fillStyle = "red";

    this.context.save();
    this.context.translate(shootPosX, shootPosY);
    this.context.rotate(rotation);

    const distance = Math.sqrt(Math.pow(enemyShootPosX - shootPosX, 2) + Math.pow(enemyShootPosY - shootPosY, 2));

    // draw a line from the tower to the player
    this.context.fillRect(0, 0, distance, 5);
    this.context.restore();


  }
}


interface Vector {
  x: number;
  y: number;
  width: number;
  height: number;
}

const closestSideDistance = (vec1: Vector, vec2: Vector) => {
  // check if left side of vec1 is closer to vec2
  if (vec1.x < vec2.x) {
    return "left"
  } else {
    return "right"
  }
}

export {
  Tower
}