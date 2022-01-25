//Initially Chris DeLeon's Snake js
//Updated to my preferences

window.onload = function () {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
}

//initial player position
let px = 10;
let py = 10;
//grid size
let gridSize = 20;
let tileCount = 30;
//initial apple coordinates
let ax = Math.floor(Math.random() * tileCount);
let ay = Math.floor(Math.random() * tileCount);
//snake velocity
let xv = 0;
let yv = 0;
let trail = [{}];
let snakeLength = 3;
let dead = 0;
//Used to identify the setInterval ID
let intervalID

function keyPush(e) {
  //left
  if(e.keyCode == 37){
    if(trail[trail.length-2].x == px - 1){
      return
    }
    xv = -1; yv = 0;
  }
  //right
  if(e.keyCode == 39){
    if(trail[trail.length-2].x == px + 1){
      return
    }
    xv = 1; yv = 0;
  }
  //up
  if(e.keyCode == 38){
    if(trail[trail.length-2].y == py - 1){
      return
    }
    xv = 0; yv = -1;
  }
  //down
  if(e.keyCode == 40){
    if(trail[trail.length-2].y == py + 1){
      return
    }
    xv = 0; yv = 1;
  }
}

function resetGame(){
  console.log('Did the game reset')
  px = 10;
  py = 10;
  //grid size
  gridSize = 20;
  //tile count
  tileCount = 30;
  //apple coordinates
  ax = Math.floor(Math.random() * tileCount);
  ay = Math.floor(Math.random() * tileCount);
  //snake velocity
  xv = 0;
  yv = 0;
  trail = [{}];
  snakeLength = 3;
  dead = 0;
}

function startGame(){
  document.addEventListener("keydown", keyPush);
  intervalID = setInterval(Game, 150);
  if(dead == 1){
    resetGame()
  }
}


function Game() {
  if(dead == 1){
    clearInterval(intervalID)
  } else {
    px += xv;
    py += yv;

    //edges
    if (px < 0) {
      dead = 1
    }
    if (px == tileCount) {
      dead = 1
    }
    if (py < 0) {
      dead = 1
    }
    if (py == tileCount) {
      dead = 1
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
      if (trail[i].x == px && trail[i].y == py) {
        snakeLength = 3;
      }
    }
    trail.push({ x: px, y: py });
    while (trail.length > snakeLength) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      snakeLength++;
      ax = Math.floor(Math.random() * tileCount);
      ay = Math.floor(Math.random() * tileCount);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gridSize, ay * gridSize, gridSize - 2, gridSize - 2);
  }
}

