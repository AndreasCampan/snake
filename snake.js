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
let gridSize = 15;
let tileCount = 40;
//initial apple coordinates
let ax = Math.floor(Math.random() * tileCount);
let ay = Math.floor(Math.random() * tileCount);
//snake velocity
let xv = 0;
let yv = 0;
let trail = [{}];
let snakeSegments = 3;
let dead = false;
//Used to identify the setInterval ID
let intervalID
let moved = 0
let snakeLength = document.getElementById("snake-length");
let gameSpeed = 100

function keyPush(e) {
  //left
  moved = 1
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
  px = 10;
  py = 10;
  //grid size
  gridSize = 15;
  //tile count
  tileCount = 40;
  //apple coordinates
  ax = Math.floor(Math.random() * tileCount);
  ay = Math.floor(Math.random() * tileCount);
  //snake velocity
  xv = 0;
  yv = 0;
  trail = [{}];
  snakeSegments = 3;
  dead = false;
  moved = 0;
}

function startGame(){
  document.addEventListener("keydown", keyPush);
  intervalID = setInterval(Game, 100);
  if(dead == true){
    resetGame()
  }
}


function Game() {
  snakeLength.innerText = snakeSegments
  if(snakeSegments > 8){
    clearInterval(intervalID)
    intervalID = setInterval(Game, 75);
  }
  if(snakeSegments > 16){
    clearInterval(intervalID)
    intervalID = setInterval(Game, 50);
  }
  if(snakeSegments > 32){
    clearInterval(intervalID)
    intervalID = setInterval(Game, 35);
  }

  if(dead == true){
    clearInterval(intervalID)
  } else {
    px += xv;
    py += yv;

    //edges
    if (px < 0) {
      dead = true
    }
    if (px == tileCount) {
      dead = true
    }
    if (py < 0) {
      dead = true
    }
    if (py == tileCount) {
      dead = true
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";

    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
      if (trail[i].x == px && trail[i].y == py && moved == 1) {
        dead = true
      }
    }
    trail.push({ x: px, y: py });
    while (trail.length > snakeSegments) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      snakeSegments++;
      ax = Math.floor(Math.random() * tileCount);
      ay = Math.floor(Math.random() * tileCount);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gridSize, ay * gridSize, gridSize - 2, gridSize - 2);
  }
}

