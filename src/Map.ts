import { Game } from "./Game";
import map01 from "./maps/map01/map01.json";

class Map {
  game: Game;
  context: CanvasRenderingContext2D;
  map: number[][];

  constructor(game: Game) {
    this.game = game;
    this.context = game.context;

    this.map = map01.map;

  }

  frame (delta: number) {
    this.draw(delta);
  }
  isCollidingY (objectX: number, objectY: number) {
    for (let z = 0; z < this.map.length; z++) {
      const [tileId, tileX, tileY, tileWidth, tileHeight] = this.map[z];

      // check if colliding with y axis
      if (objectY >= tileY && objectY <= tileY + tileHeight) {
        if (objectX >= tileX && objectX <= tileX + tileWidth) {
          return this.map[z];
        }
      }

        
    }

  }
  draw (delta: number) {
    this.context.fillStyle = "red";
    for (let x = 0; x < this.map.length; x++) {
      const tile = this.map[x];
        this.context.fillRect(tile[1], tile[2], tile[3], tile[4]);
    }


  }
}


export {
  Map
}