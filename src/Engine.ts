import { Game } from "./Game";

class Engine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  
  game: Game;

  width: number;
  height: number;
  gameWidth: number;
  gameHeight: number;
  bind: (time: number) => void;
  lastTime = 0;
  constructor(game: Game) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.context = this.canvas.getContext("2d")!

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.gameWidth = 1920;
    this.gameHeight = 1080;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    const scale = Math.min(this.width / this.gameWidth, this.height / this.gameHeight);
    this.context.scale(scale, scale);

    this.game = game;


    this.bind = this.frame.bind(this);
    requestAnimationFrame(this.bind);
    
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      const scale = Math.min(this.width / this.gameWidth, this.height / this.gameHeight);
      this.context.scale(scale, scale);
    })
  }

  frame(time: number) {
    const delta = time - this.lastTime;
    this.lastTime = time;

    this.game.frame(delta);

    requestAnimationFrame(this.bind);
  }
}

export {
  Engine
}