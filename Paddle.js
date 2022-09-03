const SPEED = .0099

export default class Paddle {
  constructor(padElem){
    this.padElem = padElem
    this.reset()
  }

  get position (){
    return parseFloat(getComputedStyle(this.padElem).getPropertyValue("--position"))
  }

  set position(value){
    this.padElem.style.setProperty("--position", value)
  }

  reset(){
    this.position = 50
  }

  rect(){
    return this.padElem.getBoundingClientRect()
  }

  update (delta, ballHeight){
    this.position += delta * SPEED * (ballHeight - this.position)
  }
}
