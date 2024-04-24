import { DebugDisplay } from "./DebugDisplay";
import { Engine } from "./Engine";
import { Keyboard } from "./Keyboard";
import { Map } from "./Map";
import { Player } from "./Player";
import { Tower } from "./Tower";


class Game {
  engine: Engine;
  context: CanvasRenderingContext2D;
  debugDisplay: DebugDisplay;

  Map: Map;
  player: Player;

  tower: Tower;

  keyboard: Keyboard;

  constructor() {
    this.engine = new Engine(this);
    this.context = this.engine.context;

    this.keyboard = new Keyboard();

    this.debugDisplay = new DebugDisplay(this);


    this.Map = new Map(this);

    this.player = new Player(this, 100, 100,{controls: true});

    this.tower = new Tower(this, 1600, 100, {controls: false, color: 'red'});

  }
  frame (delta: number) {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.engine.gameWidth, this.engine.gameHeight);

    
    this.Map.frame(delta);    
    this.player.frame(delta);

    this.tower.frame(delta);
    
    this.debugDisplay.frame(delta);
  }

}

export {
  Game
}

