const env = new environment();
const snake = [];
addSegment(300,300);

function environment(){
  this.xBoard = 600;
  this.yBoard = 600;
  this.jump =10;
}

function segment(x,y){
  this.x = x;
  this.y = y;
}

function addSegment(x,y){
  var seg = new segment(x,y);
  snake.push(seg);
}


function move(e){
  plotPos(e);
  
  //console.log(snake);
  renderSnake();  
}

function plotPos(e){
  const key = e.keyCode;
  switch(key){
    case 87:  //Up
      if(snake[0].y >= (0 + env.jump)){
        snake[0].y -= env.jump;
      }
      break;

    case 83:  //Down
      if(snake[0].y < (env.yBoard - env.jump)){
        snake[0].y += env.jump;
      }
      break;

    case 65:  //Left
      if(snake[0].x >= (0 + env.jump)){
        snake[0].x -= env.jump;
      }
      break;

    case 68:  //Right
      if(snake[0].x < (env.xBoard - env.jump)){
        snake[0].x += env.jump;
      }
      break;

    default:
      break;
  }
}

function renderSnake(){
  document.querySelector('.player').style.top = snake[0].y + 'px';
  document.querySelector('.player').style.left = snake[0].x + 'px';
  console.log(snake[0]);
}

window.addEventListener('keydown', move);