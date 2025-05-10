let boxes = document.querySelectorAll('.box');
let resetbtn = document.getElementById('reset');
let msg = document.querySelector('.turn-info');
let info = document.querySelector('.information');

let youScoreEl = document.getElementById('you-score');
let oppScoreEl = document.getElementById('opponent-score');

let turnO = true;
let isVsAI = false;
let youScore = 0;
let opponentScore = 0;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Disable all boxes
const disable = () => {
    for (let box of boxes) {
        box.style.pointerEvents = 'none';
    }
};

// Enable all boxes
const enable = () => {
    for (let box of boxes) {
        box.innerText = '';
        box.style.pointerEvents = 'auto';
        box.classList.remove('win');
    }
};   

// Reset Game
const resetGame = () => {
    youScore=0;
    opponentScore=0;
    youScoreEl.textContent=youScore;
    oppScoreEl.textContent=opponentScore;
    info.style.display = 'block';
    info.style.backgroundColor='#02032e';
    
    turnO = true;
    msg.innerHTML = isVsAI ? 'You (O) vs AI (X) — Turn for O' : 'Player O vs Player X — Turn for O';
    enable(); 
};

// Show Winner
const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    info.style.display = 'block';
    info.style.backgroundColor = 'green';
    disable();

    if (isVsAI) {
        if (winner === 'O') {
            youScore++;
            youScoreEl.textContent = youScore;
        } else {
            opponentScore++;
            oppScoreEl.textContent = opponentScore;
        }
    } else {
        if (winner === 'O') {
            youScore++;
            youScoreEl.textContent = youScore;
        } else {
            opponentScore++;
            oppScoreEl.textContent = opponentScore;
        }
    }
};

// Check Win
function checkwin() {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        let p1 = boxes[a].innerText;
        let p2 = boxes[b].innerText;
        let p3 = boxes[c].innerText;

        if (p1!=="" && p1 === p2 && p2 === p3) {

            boxes[a].classList.add('win');
            boxes[b].classList.add('win');
            boxes[c].classList.add('win');
            showWinner(p1); 
            return true;
        }
    }
    return false;
}

// Check Draw
function checkDraw() {
    let filled = [...boxes].every(box => box.innerText !== '');
    if (filled && !checkwin()) {
        msg.innerHTML = "It's a Draw!";
        info.style.display = 'block';
        info.style.backgroundColor = 'orange';
        disable();
        return true;
    }
    return false;
}

// AI Move (Random)
function aiMove() {
    let emptyBoxes = [...boxes].filter(box => box.innerText === '');
    if (emptyBoxes.length === 0) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = 'X';
    randomBox.style.color = 'red';
    randomBox.style.pointerEvents = 'none';
    msg.innerHTML = 'Your Turn (O)';
    info.style.backgroundColor = '#02032e';
    turnO = true;
    if (!checkwin()) checkDraw();
}

// Box Click
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== '') return;

        info.style.display = 'block';

        if (turnO) {
            box.innerText = 'O';
           box.style.color = 'green';
            box.style.pointerEvents = 'none';
            if (!checkwin()) {
                if (isVsAI) {
                    msg.innerHTML = 'AI Thinking...';
                    setTimeout(aiMove, 500);
                } else {
                    msg.innerHTML = 'Turn for X';
                    info.style.backgroundColor='#02032e';
                }
                turnO = false;
                checkDraw();
            }
        } else if (!isVsAI) {
            box.innerText = 'X';
            box.style.color = 'red';
            box.style.pointerEvents = 'none';
            if (!checkwin()) {
                msg.innerHTML = 'Turn for O';
                turnO = true;
                checkDraw();
            }
        }
    });
});

// Game Mode Buttons
document.getElementById('play-with-player').addEventListener('click', () => {
    isVsAI = false;
    resetGame();
});

document.getElementById('play-with-ai').addEventListener('click', () => {
    isVsAI = true;
    resetGame();
});

// Reset Button
resetbtn.addEventListener('click', resetGame);
