import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const gameWheel = document.getElementById("wheel")
const scoreReset = document.getElementById("reset")
const paddleSize = document.getElementById("paddleSize")
const gameControls = document.querySelectorAll("input[type=radio]")
const closeCross = document.getElementById("closing")


let lastTime
let isMouseControled = true

function update(time){
  if (lastTime != null){
    const delta = time - lastTime
    ball.update(delta , [playerPaddle.rect()], [computerPaddle.rect()])
    computerPaddle.update(delta,ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
    document.documentElement.style.setProperty("--hue", hue + delta * .01)

    if (isLose()) handleLose()
  }
  lastTime = time
  window.requestAnimationFrame(update)

}

document.addEventListener("mousemove", (e) => {
  if (!isMouseControled) return
  playerPaddle.position = e.y / window.innerHeight * 100
 })

document.addEventListener("keydown", (e) => {
  if (isMouseControled) return
  if (e.key === "ArrowUp"){
    if(playerPaddle.position <= 0) return
    playerPaddle.position = playerPaddle.position - 4,5
  } else if ((e.key === "ArrowDown")){
    if(playerPaddle.position >= 100) return
    playerPaddle.position = playerPaddle.position + 4,5
  }
})


gameWheel.addEventListener("click", showSettings)
closeCross.addEventListener("click", closeSettings)
scoreReset.addEventListener("click", resetScore)
paddleSize.addEventListener("change", (e) => {resizePaddle(e)})
gameControls.forEach(radio => radio.addEventListener('change', (e) => updateControls(e)));


function isLose(){
  const rect = ball.rect();
  return (rect.right >= window.innerWidth || rect.left <= 0)
}

function handleLose(){
  const rect = ball.rect();
  if(rect.right >= window.innerWidth){
    playerScoreElem.innerText = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.innerText = parseInt(computerScoreElem.textContent) + 1
  };
  ball.reset()
  computerPaddle.reset()
}


function showSettings(){
  const windowSettings = document.getElementsByClassName("tohide")
  windowSettings[0].classList.toggle("hide")
}

function closeSettings(){
  const windowSettings = document.getElementsByClassName("tohide")
  windowSettings[0].classList.add("hide")
}

function resetScore(){
  ball.reset()
  computerPaddle.reset()
  playerScoreElem.innerText = 0
  computerScoreElem.innerText = 0
}

function resizePaddle(e) {
  document.getElementById("player-paddle").style.setProperty("--size", (e.target.value))
}

function updateControls(e){
  if (e.target.value === "mouse"){
    isMouseControled = true
   } else if (e.target.value === "arrows"){
     isMouseControled = false
   }
}
window.requestAnimationFrame(update)
