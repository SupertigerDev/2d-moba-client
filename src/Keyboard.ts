const Keys = ["W", "A", "S", "D", "SPACE", "SHIFT"] as const
class Keyboard {
  keys: {[key in typeof Keys[number]]: boolean} = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false,
    SHIFT: false
  };

  constructor() {
    document.addEventListener("keydown", (e) => {
        this.keys[e.key.toUpperCase().trim() || "SPACE" ] = true;
    });
    document.addEventListener("keyup", (e) => {
        this.keys[e.key.toUpperCase().trim() || "SPACE" ] = false;
    });
  }
}

export { Keyboard }