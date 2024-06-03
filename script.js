let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newgamebtn = document.querySelector("#newbtn");
let displaycontainer = document.querySelector(".displaycontainer");
let display = document.querySelector("#display");


let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winp = [ [0, 1, 2],[0, 3, 6],[0, 4, 8],[1, 4, 7],[2, 5, 8],[2, 4, 6],[3, 4, 5],[6, 7, 8]];

const resetgame = () => {
  turnO = true;
  count = 0;
  enableboxes();
  displaycontainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  display.innerText = `Game was a Draw.`;
  displaycontainer.classList.remove("hide");
  disableBoxes();
};

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  display.innerText = `Winner is ${winner}`;
  displaycontainer.classList.remove("hide");
  disableboxes();
};

const checkWinner = () => {
  for (let pattern of winp) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);