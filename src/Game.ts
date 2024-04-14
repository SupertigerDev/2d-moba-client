import { DebugDisplay } from "./DebugDisplay";
import { Engine } from "./Engine";
import { Entity } from "./Entity";
import { Keyboard } from "./Keyboard";
import { Map } from "./Map";


class Game {
  engine: Engine;
  context: CanvasRenderingContext2D;
  debugDisplay: DebugDisplay;

  Map: Map;
  player: Entity;

  tower: Entity

  keyboard: Keyboard;

  constructor() {
    this.engine = new Engine(this);
    this.context = this.engine.context;

    this.keyboard = new Keyboard();

    this.debugDisplay = new DebugDisplay(this);


    this.Map = new Map(this);

    this.player = new Entity(this, 100, 100,{controls: true});

    this.tower = new Entity(this, 1800, 100, {controls: false});

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

