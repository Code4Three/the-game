const options = {
  //Game
  mult: 0.95, //how much to decrease speed interval each grow
  //board
  xBoard: 300,
  yBoard: 300,
  //Snake
  xStart: 150,
  yStart: 150,
  jump: 10,
  speed: 1000,
  maxSpeed: 100,
  //Food
  foodTime: 10000,
  foodMult: 0.5,
  maxFoods: 2,
  maxMaxFoods: 10
};

function setup() {
  //Create Board Element
  const body = document.getElementsByTagName("body")[0];
  const board = document.createElement("div");
  body.appendChild(board);
  board.classList.add("board");
  board.style.width = `${options.xBoard}px`;
  board.style.height = `${options.yBoard}px`;

  //Create Snakes head
  const head = board.appendChild(document.createElement("div"));
  head.classList.add("head");
  head.style.top = `${options.yStart}px`;
  head.style.left = `${options.xStart}px`;
  snake1.body.push(head);

  //create gameover div
  const gameOver = board.appendChild(document.createElement("div"));
  gameOver.classList.add("gameOver");
  gameOver.style.visibility = "hidden";
  gameOver.innerHTML = "GAME OVER";
}

/***************************SNAKE**********************/
class snake {
  constructor() {
    this.body = [];
    this.direction = "w"; //maybe randomise this
  }

  move() {
    const head = document.querySelector(".head");
    let x = parseInt(head.style.left);
    let y = parseInt(head.style.top);
    let xLeader = x;
    let yLeader = y;

    switch (this.direction) {
      //Up
      case "w":
        if (y == 0) {
          y = options.yBoard - options.jump;
        } else {
          y -= options.jump;
        }
        head.style.top = `${y}px`; //move head
        break;

      //Down
      case "s":
        if (y == options.yBoard - options.jump) {
          y = 0;
        } else {
          y += options.jump;
        }
        head.style.top = `${y}px`; //move head
        break;

      //Left
      case "a":
        if (x == 0) {
          x = options.xBoard - options.jump;
        } else {
          x -= options.jump;
        }
        head.style.left = `${x}px`; //move head
        break;

      //Right
      case "d":
        if (x == options.xBoard - options.jump) {
          x = 0;
        } else {
          x += options.jump;
        }
        head.style.left = `${x}px`; //move head
        break;

      default:
        break;
    }

    const gameOver = this.checkBumpedHead();
    if (!gameOver) {
      const moveTimer = window.setTimeout(
        () => snake1.move.call(snake1),
        options.speed
      );
    } else {
      document.querySelector(".gameOver").style.visibility = "visible";
      clearInterval(foodTimer);
    }

    //move body
    this.body.forEach(body => {
      if (body.className == "head") {
        body.style.top = `${y}px`;
        body.style.left = `${x}px`;
      } else {
        y = parseInt(body.style.top);
        x = parseInt(body.style.left);
        body.style.top = `${yLeader}px`;
        body.style.left = `${xLeader}px`;
        xLeader = x;
        yLeader = y;
      }
    });

    this.checkDinnerTime();
  }

  checkDinnerTime() {
    const board = document.querySelector(".board");
    const food = foods.food;
    const xHead = this.body[0].style.left;
    const yHead = this.body[0].style.top;
    food.forEach((food1, index) => {
      if (xHead == food1.style.left && yHead == food1.style.top) {
        food.splice(index, 1);
        board.removeChild(food1);
        this.grow();
        foods.addFood();
      }
    });
  }

  checkBumpedHead() {
    const gameOver = 0;

    this.body.forEach(body => {
      if (body.className != "head") {
        if (
          this.body[0].style.top == body.style.top &&
          this.body[0].style.left == body.style.left
        ) {
          this.gameOver = 1;
        }
      }
    });
    return this.gameOver;
  }

  grow() {
    //get head
    const head = document.querySelector(".head");
    //attach head to body
    if (!this.body.length) {
      this.body.push(head);
    }
    //create new body part
    const newBody = document
      .querySelector(".board")
      .appendChild(document.createElement("div"));
    newBody.classList.add("body");
    newBody.style.top = head.style.top;
    newBody.style.left = head.style.left;

    this.body.push(newBody); //attach new body part

    if (options.speed > options.maxSpeed) {
      options.speed *= options.mult; //alter move interval (speed)
    }

    options.foodTime *= options.mult;

    if (options.maxFoods < options.maxMaxFoods) {
      options.maxFoods += options.foodMult;
    }
  }

  steer(e) {
    switch (e.keyCode) {
      case 87: //Up
        snake1.direction = "w";
        break;

      case 83: //Down
        snake1.direction = "s";
        break;

      case 65: //Left
        snake1.direction = "a";
        break;

      case 68: //Right
        snake1.direction = "d";
        break;

      default:
        break;
    }
    snake1.move;
  }
}

/**********************FOOD**************/
class food {
  constructor() {
    this.food = [];
  }

  addFood() {
    if (this.food.length > options.maxFoods - 1) {
      return;
    }
    const board = document.querySelector(".board");
    const xRand = Math.floor(Math.random() * (options.xBoard / 10)) * 10;
    const yRand = Math.floor(Math.random() * (options.yBoard / 10)) * 10;
    const newFood = document.createElement("div");

    board.appendChild(newFood);
    newFood.classList.add("food");
    newFood.style.left = `${xRand}px`;
    newFood.style.top = `${yRand}px`;
    this.food.push(newFood);
  }
}

const snake1 = new snake();
const foods = new food();
const foodTimer = window.setInterval(
  () => foods.addFood.call(foods),
  options.foodTime
);

setup();
foods.addFood();
snake1.move();

window.addEventListener("keydown", snake1.steer);
