export class AssetScenario {
  constructor(id, timeline, layerX, layerY) {
    this.ticks  = {}
    this.id     = id
    this.updateTick(timeline, layerX, layerY)
  }

  tickFor(key){
    return this.ticks[key]
  }

  updateTick(timeline, x, y){
    console.log("*** updateTick", x, y);
    this.ticks[timeline] = {layerX : x, layerY : y}
  }

  getTicks(){
    return this.ticks
  }
}
