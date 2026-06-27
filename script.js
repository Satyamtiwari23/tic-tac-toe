let xScore = 0;
let oScore = 0;
let drawScore = 0;
let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let resetScore = document.querySelector("#reset-score");
let nGame = document.querySelector("#new-game");
let msgCont = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let newGame = document.querySelector(".newGame");
let drawCont = document.querySelector(".draw-cont");
let turnMsg = document.querySelector("#turn");
let xText = document.querySelector("#xScore");
let oText = document.querySelector("#oScore");
let drawText = document.querySelector("#drawScore");
let winnerFound = false;
let turn0 = true;
let count = 0;
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const newGameBtn = () => {
    turn0 = true;
    count = 0;
    winnerFound = false;

    enableBox();
    msgCont.classList.add("hidden");
    newGame.classList.add("hidden");
    drawCont.classList.add("hidden");


    updateTurn();
}

const resetScores = () => {

    // Reset board
    turn0 = true;
    count = 0;
    winnerFound = false;

    enableBox();

    msgCont.classList.add("hidden");
    drawCont.classList.add("hidden");
    newGame.classList.add("hidden");

    updateTurn();

    // Reset scores
    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xText.innerText = "X : 0";
    oText.innerText = "O : 0";
    drawText.innerText = "Draw : 0";
}

const resetBoard = () => {

    turn0 = true;
    count = 0;
    winnerFound = false;

    enableBox();

    msgCont.classList.add("hidden");
    drawCont.classList.add("hidden");
    newGame.classList.add("hidden");

    updateTurn();
}
const updateTurn = () => {
    turnMsg.innerText = turn0
        ? "Player O's Turn"
        : "Player X's Turn";
}
const enableBox = () => {
    for (let b of box) {
        b.disabled = false;
        b.innerText = "";
        b.classList.remove("winner");
    }
}
const disableBox = () => {
    for (let b of box) {
        b.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `🏆 Player ${winner} Wins!`;
    msgCont.classList.remove("hidden");
    newGame.classList.remove("hidden");

    turnMsg.innerText = "";
    if (winner === "O") {

        oScore++;

        oText.innerText = `O : ${oScore}`;

    } else {

        xScore++;

        xText.innerText = `X : ${xScore}`;

    }
    disableBox();
}





box.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X"
            turn0 = true;
        }
        updateTurn();
        box.classList.remove("preview");
        box.disabled = true;
        count++;
        checkWinner();
    });

    box.addEventListener("mouseover", () => {

        if (box.disabled) return;

        if (box.innerText === "") {

            box.innerText = turn0 ? "O" : "X";

            box.classList.add("preview");

        }

    });

    box.addEventListener("mouseout", () => {

        if (box.disabled) return;

        if (box.classList.contains("preview")) {

            box.innerText = "";

            box.classList.remove("preview");

        }

    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = box[pattern[0]].innerText;
        let pos2 = box[pattern[1]].innerText;
        let pos3 = box[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                winnerFound = true;
                box[pattern[0]].classList.add("winner");
                box[pattern[1]].classList.add("winner");
                box[pattern[2]].classList.add("winner");

                return;
            }
        }
    }
    if (!winnerFound && count === 9) {
        drawScore++;

        drawText.innerText = `Draw : ${drawScore}`;
        turnMsg.innerText = "";
        drawCont.classList.remove("hidden");
        newGame.classList.remove("hidden");
    }
}




nGame.addEventListener("click", newGameBtn);
reset.addEventListener("click", resetBoard);
resetScore.addEventListener("click", resetScores);