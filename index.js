const root = document.querySelector(":root");
const playerX = document.getElementById("player1");
const playerO = document.getElementById("player2");
const gameBoard = document.getElementById("gameBoard");
const charKeys = document.querySelectorAll(".charKey");
const title = document.getElementById("title");
const reset = document.getElementById("reset");
const main = document.getElementById("main");
let vBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

charKeys.forEach(function (element) {
  element.addEventListener("click", clickBoard);
});

function disablePosition(element) {
  element.style.cursor = "default";
  element.removeEventListener("click", clickBoard);
}

title.addEventListener("click", function () {
  location.reload();
});

function clickBoard(ev) {
  const region = ev.currentTarget.dataset.position;
  const rowColumn = region.split(".");
  const row = rowColumn[0];
  const column = rowColumn[1];

  if (playerX.classList.contains("destaque")) {
    playerX.classList.remove("destaque");
    playerO.classList.add("destaque");
    ev.currentTarget.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    playerO.classList.remove("destaque");
    playerX.classList.add("destaque");
    ev.currentTarget.innerText = "O";
    vBoard[row][column] = "O";
  }

  console.table(vBoard);
  disablePosition(ev.currentTarget);

  const winRegions = calculate();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    return;
  } else {
    resetDisplay();
  }
}

function resetDisplay() {
  reset.style.display = "flex";
  reset.addEventListener("click", function () {
    location.reload();
  });
}

function handleWin(regions) {
  regions.forEach(function (regions) {
    let regionsWins = document.querySelector(
      '[data-position="' + regions + '"]'
    );
    regionsWins.classList.add("win");
  });
  resetDisplay();
}

function calculate() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}
