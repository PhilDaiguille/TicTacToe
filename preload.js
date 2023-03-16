window.addEventListener('DOMContentLoaded', () => {
  let Joueur = "X";
  let Status = ["", "", "", "", "", "", "", "", ""];

  const Combo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const cellule = document.querySelectorAll(".cell");
  for (let i = 0; i < cellule.length; i++) {
    cellule[i].addEventListener("click", cellClicked, false);
  }

  function cellClicked(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");
    if (Status[cellIndex] !== "") {
      return;
    }
    Status[cellIndex] = Joueur;
    cell.textContent = Joueur;
    checkWinner();
    Joueur = Joueur === "X" ? "O" : "X";
    if (Joueur === "O") {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  }

  function checkWinner() {
    for (let i = 0; i < Combo.length; i++) {
      const [a, b, c] = Combo[i];
      if (
        Status[a] !== "" &&
        Status[a] === Status[b] &&
        Status[b] === Status[c]
      ) {
        alert(`${Joueur} won the game!`);
        resetGame();
        return;
      }
    }
    if (Status.indexOf("") === -1) {
      resetGame();
    }
  }

  function resetGame() {
    Status = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < cellule.length; i++) {
      cellule[i].textContent = "";
    }
    Joueur = "X";
  }

  function makeAIMove() {
    let emptycellule = [];
    for (let i = 0; i < Status.length; i++) {
      if (Status[i] === "") {
        emptycellule.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * emptycellule.length);
    const cellIndex = emptycellule[randomIndex];
    const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
    Status[cellIndex] = Joueur;
    cell.textContent = Joueur;
    checkWinner();
    Joueur = Joueur === "X" ? "O" : "X";
  }
});
