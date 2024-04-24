import { Game } from "./Game";

export interface EntityOptions {
  controls?: boolean
  color?: string;
}

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
  options?: EntityOptions;
  targetEnemy: Entity | null;
  color: string;


  constructor(game: Game, x: number, y: number, w: number, h: number, options?: EntityOptions ) {
    this.options = options;
    this.game = game;
    this.context = game.context;

    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.velocitySpeed = 0.009;
    this.velocity = 0;

    this.grounded = false;


    this.targetEnemy = null
    this.color = options?.color || "green"


  }

  frame (delta: number) {
    this.update(delta);
    this.draw();
  }
  update(delta: number) {
    this.updateGravity(delta)

    if (this.options?.controls) {
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

  }
  draw () {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);

    // this.visualizeEnemy();
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

  visualizeEnemy() {
    if (!this.targetEnemy) return;
    const closestXEnemy = closestSideDistance({height: this.height, width: this.width, x: this.x, y: this.y}, {height: this.targetEnemy.height, width: this.targetEnemy.width, x: this.targetEnemy.x, y: this.targetEnemy.y});
    const enemyWidth = this.targetEnemy.width;
    const enemyShootPosX = this.targetEnemy.x + (closestXEnemy === "left" ? 0 : enemyWidth);
    const enemyShootPosY = this.targetEnemy.y + (enemyWidth / 2);



    const closestXTower = closestSideDistance({height: this.height, width: this.width, x: this.x, y: this.y}, {height: this.targetEnemy.height, width: this.targetEnemy.width, x: this.targetEnemy.x, y: this.targetEnemy.y});


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
  enemyShootRotation() {
    if (!this.targetEnemy) return;



    const enemyShootPosX = this.targetEnemy.x + (this.targetEnemy.width / 2);
    const enemyShootPosY = this.targetEnemy.y + (this.targetEnemy.height / 2);
    
    const shootPosX = this.x
    const shootPosY = this.y
    const rotation = Math.atan2(enemyShootPosY - shootPosY, enemyShootPosX - shootPosX);

    return rotation;
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
  Entity
}