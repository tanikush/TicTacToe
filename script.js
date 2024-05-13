let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true; // track whose turn it is (true for 'X', false for 'O')

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const resetGame = () => {
    turnX = true; // reset the turn to 'X'
    enabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // only allow marking if the box is empty
            box.innerText = turnX ? "X" : "O";
            turnX = !turnX; // toggle the turn

            box.disabled = true;
            checkWinner();
        }
    });
});

const disabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].innerText;
        const valB = boxes[b].innerText;
        const valC = boxes[c].innerText;

        if (valA !== "" && valA === valB && valB === valC) {
            showWinner(valA); // valA (X or O) is the winner
            break; // exit the loop if we have a winner
        }
    }

    // Check for a tie (if all boxes are filled)
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

