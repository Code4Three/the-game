const boardX = 600;
const boardY = 600;
let currentX = boardX / 2;
let currentY = boardY / 2;
const jump = 10;
const rockTimer = 2000;

function movePlayer() {
  document.querySelector("#player").style.top = `${currentY}px`;
  document.querySelector("#player").style.left = `${currentX}px`;
}

function plotPos(e) {
  const key = e.keyCode;
  // console.log(key);
  switch (key) {
    case 87:
      if (currentY >= jump) {
        currentY -= jump;
      }
      break;

    case 83:
      if (currentY < boardY - jump) {
        currentY += jump;
      }
      break;

    case 65:
      if (currentX >= jump) {
        currentX -= jump;
      }
      break;

    case 68:
      if (currentX < boardX - jump) {
        currentX += jump;
      }
      break;

    default:
      return;
  }
  // console.log(currentX);
  // console.log(currentY);
  // console.log('00');
  movePlayer();
}

function rockFactory() {
  //todo
}

window.addEventListener("keydown", plotPos);
setInterval(rocks, rockTimer);
