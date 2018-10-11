"use strict";

const options = {
  xBoard: 600,
  yBoard: 600,
  xStart: 300,
  yStart: 300,
  jump: 10
};

function setup() {
  //Create Board Element
  const board = document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("div"));
  board.classList.add("board");

  //Create Snakes head
  const head = document
    .querySelector(".board")
    .appendChild(document.createElement("div"));
  head.classList.add("head");
  //set head starting position
  head.style.top = `${options.yStart}px`;
  head.style.left = `${options.xStart}px`;
}

//***************************SNAKE**********************/
class snake {
  constructor() {
    this.body = [];
    this.direction = "w";
  }

  grow() {
    //get head
    const head = document.querySelector(".head");
    //attach head to body
    if (!this.body.length) {
      this.body.push(head);
    }
    //Create new body segment
    const newBody = document
      .querySelector(".board")
      .appendChild(document.createElement("div"));
    newBody.classList.add("body");
    newBody.style.top = head.style.top;
    newBody.style.left = head.style.left;
    //attach new body part
    this.body.push(newBody);
  }

  move() {
    let head = document.querySelector(".head");
    let x = parseInt(head.style.left);
    let y = parseInt(head.style.top);
    let xLeader = x;
    let yLeader = y;

    switch (this.direction) {
      case "w": //Up
        if (y == 0) {
          y = options.yBoard - options.jump;
        } else {
          y -= options.jump;
        }

        //move head
        head.style.top = `${y}px`;

        //move body
        this.body.forEach(body => {
          if(body.className == 'head'){
            body.style.top = `${y}px`
            body.style.left = `${x}px`
          }
          else{
            y = parseInt(body.style.top);
            x = parseInt(body.style.left);
            body.style.top = `${yLeader}px`
            body.style.left = `${xLeader}px`
            xLeader = x;
            yLeader = y;
          }
        })
        break;

      case "s": //Down
        if (y == options.yBoard - options.jump) {
          y = 0;
        } else {
          y += options.jump;
        }

        //move head
        head.style.top = `${y}px`;

        //move body
        this.body.forEach(body => {
          if(body.className == 'head'){
            body.style.top = `${y}px`
            body.style.left = `${x}px`
          }
          else{
            y = parseInt(body.style.top);
            x = parseInt(body.style.left);
            body.style.top = `${yLeader}px`
            body.style.left = `${xLeader}px`
            xLeader = x;
            yLeader = y;
          }
        })
        break;

      case "a": //Left
        if (x == 0) {
          x = options.xBoard - options.jump;
        } else {
          x -= options.jump;
        }

        //move head
        head.style.left = `${x}px`;

        //move body
        this.body.forEach(body => {
          if(body.className == 'head'){
            body.style.top = `${y}px`
            body.style.left = `${x}px`
          }
          else{
            y = parseInt(body.style.top);
            x = parseInt(body.style.left);
            body.style.top = `${yLeader}px`
            body.style.left = `${xLeader}px`
            xLeader = x;
            yLeader = y;
          }
        })
        break;

      case "d": //Right
        if (x == options.xBoard - options.jump) {
          x = 0;
        } else {
          x += options.jump;
        }

        //move head
        head.style.left = `${x}px`;

        //move body
        this.body.forEach(body => {
          if(body.className == 'head'){
            body.style.top = `${y}px`
            body.style.left = `${x}px`
          }
          else{
            y = parseInt(body.style.top);
            x = parseInt(body.style.left);
            body.style.top = `${yLeader}px`
            body.style.left = `${xLeader}px`
            xLeader = x;
            yLeader = y;
          }
        })
        break;

      default:
        break;
    }
  }

  steer(e) {
    console.log(snake1.direction);
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
    if (xHead == e.x && snake.body[0].y == e.y) {
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

const snake1 = new snake();
setup();
window.setInterval(() => snake1.move.call(snake1), 1000);
window.setInterval(() => snake1.grow.call(snake1), 2000);
window.addEventListener("keydown", snake1.steer);
