const env = new environment();
const snake = new avatar();
snake.addSegment(1,1);
const foods = [];

addFood(100, 100);
addFood(200, 200);
addFood(400, 400);

function environment() {
  this.xBoard = 600;
  this.yBoard = 600;
  this.jump = 10;
}

function avatar() {
  const body = [];

  this.addSegment = function(x, y) {
    const seg = document.createElement("div");
    seg.classList.add("player");
    if (snake.length < 1) {
      seg.top = "700px";
      seg.left = "700px";
    }
    const board = document.querySelector(".board");
    board.appendChild(seg);
    body.push(seg);
    console.log(body);
  };

  this.plotPos = function(e) {
    const key = e.keyCode;
    switch (key) {
      case 87: //Up
        if (snake.body[0].y >= 0 + env.jump) {
          snake.body[0].y -= env.jump;
        }
        break;

      case 83: //Down
        if (snake.body[0].y < env.yBoard - env.jump) {
          snake.body[0].y += env.jump;
        }
        break;

      case 65: //Left
        if (snake.body[0].x >= 0 + env.jump) {
          snake.body[0].x -= env.jump;
        }
        break;

      case 68: //Right
        if (snake.body[0].x < env.xBoard - env.jump) {
          snake.body[0].x += env.jump;
        }
        break;

      default:
        break;
    }
  };

  this.move = function(e) {
    console.log("to here");
    this.plotPos(e);
    renderSnake();
    checkCollision();
  };

  
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
    if (snake.body[0].x == e.x && snake.body[0].y == e.y) {
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
  addFood(600, 100);
}

function renderSnake() {
  document.querySelector(".player").style.top = `${snake.body[0].y}px`;
  document.querySelector(".player").style.left = `${snake.body[0].x}px`;
  //.log(snake[0]);
  //console.log(foods);
}

function renderFoods() {}

window.addEventListener("keydown", snake.move);
