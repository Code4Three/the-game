const env = new environment();
const snake = new snake;
const foods = [];

addSegment(300, 300);
addFood(100, 100);
addFood(200, 200);
addFood(400, 400);

function environment() {
  this.xBoard = 600;
  this.yBoard = 600;
  this.jump = 10;
}
function snake(){
  const segments = [];
  
  function addSegment(x, y) {
    const seg = document.createElement('div');
    seg.classList.add('player');
    if(snake.length < 1){
      seg.top = '700px';
      seg.left = '700px';
    }
    const board = document.querySelector('.board');
    board.appendChild(seg);
    this.segments.push(seg);
  }

  
function move(e) {
  plotPos(e);
  renderSnake();
  checkCollision();
}

function plotPos(e) {
  const key = e.keyCode;
  switch (key) {
    case 87: //Up
      if (snake[0].y >= 0 + env.jump) {
        snake[0].y -= env.jump;
      }
      break;

    case 83: //Down
      if (snake[0].y < env.yBoard - env.jump) {
        snake[0].y += env.jump;
      }
      break;

    case 65: //Left
      if (snake[0].x >= 0 + env.jump) {
        snake[0].x -= env.jump;
      }
      break;

    case 68: //Right
      if (snake[0].x < env.xBoard - env.jump) {
        snake[0].x += env.jump;
      }
      break;

    default:
      break;
  }
}
}


function food(x, y) {
  this.x = x;
  this.y = y;
}

function addFood(x, y) {
  var a = new food(x, y);
  foods.push(a);
}


function checkCollision() {
  foods.forEach(function(e, i) {
    if (snake[0].x == e.x && snake[0].y == e.y) {
      console.log("The foods is gones");
      console.log(foods);
      console.log(e);
      console.log(i);
      eat(i);
    }
  });
}

function eat(i) {
  foods.splice(i, 1);
  addFood(600,100);
}

function renderSnake() {
  document.querySelector(".player").style.top = `${snake[0].y}px`;
  document.querySelector(".player").style.left = snake[0].x + "px";
  //.log(snake[0]);
  //console.log(foods);
}

function renderFoods() {
  
}

window.addEventListener("keydown", move);
