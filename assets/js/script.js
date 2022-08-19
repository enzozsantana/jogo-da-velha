const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector("[data-winning-message-text]");
const winningMessageImage = document.querySelector("[data-winning-message-image");
const restartButton = document.querySelector("[data-restart-button]");

let isVirusTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isVirusTurn = true;

    for(const cell of cellElements) {
        cell.classList.remove("virus");
        cell.classList.remove("pills");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) => {
    if(isDraw) {
        winningMessageText.innerHTML = "Empate!";
        winningMessageImage.src = 'assets/images/draw.png';
    } else {
        winningMessageText.innerHTML = "Venceu!";
        winningMessageImage.src = isVirusTurn ? 'assets/images/virus-victory.png' : 'assets/images/pills-victory.png'
    }

    winningMessage.classList.add('show-winning-message');
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('virus') || cell.classList.contains('pills')
    });
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove('virus');
    board.classList.remove('pills');

    if(isVirusTurn) {
        board.classList.add('virus');
    } else {
        board.classList.add('pills');
    }
}

const swapTurns = () => {
    isVirusTurn = !isVirusTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    // Colocar a bactéria ou as pílulas
    const cell = e.target;
    const classToAdd = isVirusTurn ? 'virus' : 'pills';

    placeMark(cell, classToAdd);

    // Verificar vitória
    const isWin = checkForWin(classToAdd);

     // Verificar empate
    const isDraw = checkForDraw();

    if(isWin) {
        endGame(false);
    } else if(isDraw) {
        endGame(true);
    } else {
        // Mudar jogador
        swapTurns(); 
    }
}

startGame();

restartButton.addEventListener("click", startGame);