class Game {
  constructor() {
    //Game
    this.mult = 0.95; //how much to decrease speed interval each grow
    //board
    this.xBoard = 300;
    this.yBoard = 300;
    //Snake
    this.xStart = 150;
    this.yStart = 150;
    this.jump = 10;
    this.speed = 400;
    this.maxSpeed = 100;
    //Food
    this.foodTime = 10000;
    this.foodMult = 0.5;
    this.maxFoods = 2;
    this.maxMaxFoods = 10;
  }

  setup(snake) {
    //Create Board Element
    const body = document.getElementsByTagName('body')[0];
    const board = document.createElement('div');
    body.appendChild(board);
    board.classList.add('board');
    board.style.width = `${this.xBoard}px`;
    board.style.height = `${this.yBoard}px`;

    //Create Snakes head
    const head = board.appendChild(document.createElement('div'));
    head.classList.add('head');
    head.style.top = `${this.yStart}px`;
    head.style.left = `${this.xStart}px`;
    snake.body.push(head);

    //create popup div
    const popup = board.appendChild(document.createElement('div'));
    popup.classList.add('popup');
    popup.style.visibility = 'hidden';
    popup.innerHTML = 'GAME OVER';
  }

  checkgameOver(snake) {
    snake.body.forEach(bodyPart => {
      if (bodyPart.className != 'head') {
        if (
          snake.body[0].style.top == bodyPart.style.top &&
          snake.body[0].style.left == bodyPart.style.left
        ) {
          document.querySelector('.gameOver').style.visibility = 'visible';
          clearInterval(foodTimer);
        }
      }
    });
  }
}

/***************************SNAKE**********************/
class Snake {
  constructor(direction) {
    this.body = [];
    this.direction = 'w'; //maybe randomise this
    this.hungry = true;
  }

  move(game, foods) {
    const head = document.querySelector('.head');
    let x = parseInt(head.style.left);
    let y = parseInt(head.style.top);

    switch (this.direction) {
      //Up
      case 'w':
        if (y == 0) {
          y = game.yBoard - game.jump;
        } else {
          y -= game.jump;
        }
        head.style.top = `${y}px`; //move head
        break;

      //Down
      case 's':
        if (y == game.yBoard - game.jump) {
          y = 0;
        } else {
          y += game.jump;
        }
        head.style.top = `${y}px`; //move head
        break;

      //Left
      case 'a':
        if (x == 0) {
          x = game.xBoard - game.jump;
        } else {
          x -= game.jump;
        }
        head.style.left = `${x}px`; //move head
        break;

      //Right
      case 'd':
        if (x == game.xBoard - game.jump) {
          x = 0;
        } else {
          x += game.jump;
        }
        head.style.left = `${x}px`; //move head
        break;

      default:
        break;
    }
  }

  moveBody() {
    const head = document.querySelector('.head');
    let x = parseInt(head.style.left);
    let y = parseInt(head.style.top);
    let xLeader = x;
    let yLeader = y;
    //move body
    this.body.forEach(body => {
      if (body.className == 'head') {
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
  }

  checkDinnerTime(foods) {
    const board = document.querySelector('.board');
    const food = foods.food;
    const xHead = this.body[0].style.left;
    const yHead = this.body[0].style.top;
    food.forEach((f, index) => {
      if (xHead == f.style.left && yHead == f.style.top) {
        food.splice(index, 1);
        board.removeChild(f);
        this.hungry = false;
      }
    });
  }

  grow(game) {
    console.log(this.hungry);
    //get head
    const head = document.querySelector('.head');
    //attach head to body
    if (!this.body.length) {
      this.body.push(head);
    }
    //create new body part
    const newBody = document
      .querySelector('.board')
      .appendChild(document.createElement('div'));
    newBody.classList.add('body');
    newBody.style.top = head.style.top;
    newBody.style.left = head.style.left;

    this.body.push(newBody); //attach new body part

    if (game.speed > game.maxSpeed) {
      game.speed *= game.mult; //alter move interval (speed)
    }

    game.foodTime *= game.mult;

    if (game.maxFoods < game.maxMaxFoods) {
      game.maxFoods += game.foodMult;
    }
    this.hungry = true;
  }

  steer(e) {
    switch (e.keyCode) {
      case 87: //Up
        return 'w';
        break;

      case 83: //Down
        return 's';
        break;

      case 65: //Left
        return 'a';
        break;

      case 68: //Right
        return 'd';
        break;

      default:
        break;
    }
  }
}

/**********************FOOD**************/
class Food {
  constructor() {
    this.food = [];
  }

  addFood(game) {
    if (this.food.length > game.maxFoods - 1) {
      return;
    }
    const board = document.querySelector('.board');
    const xRand = Math.floor(Math.random() * (game.xBoard / 10)) * 10;
    const yRand = Math.floor(Math.random() * (game.yBoard / 10)) * 10;
    const newFood = document.createElement('div');

    board.appendChild(newFood);
    newFood.classList.add('food');
    newFood.style.left = `${xRand}px`;
    newFood.style.top = `${yRand}px`;
    this.food.push(newFood);
  }
}

(function play() {
  const game = new Game();
  const snake = new Snake();
  const foods = new Food();
  const setup = game.setup(snake);

  const foodTimer = window.setInterval(
    () => foods.addFood(game),
    game.foodTime
  );
  foods.addFood(game);

  const snakeTimer = window.setInterval(function() {
    //const eaten = snake.checkDinnerTime(foods);
    //var e = 10;
    if (!snake.hungry) {
      snake.grow(game);
      foods.addFood(game);
    }

    snake.moveBody();
    snake.move(game, foods);
    snake.checkDinnerTime(foods);
  }, game.speed);

  //snake.move(game, foods);
  window.addEventListener('keydown', e => {
    snake.direction = snake.steer(e);
  });
})();
