const grid = document.querySelector(".grid");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

const width = 10

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);

        squares.push(square);
    }
}

function startGame() {
    //remove snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    
    //remove apple
    squares[appleIndex].classList.remove('apple')

    clearInterval(timerId);
    currentSnake = [2, 1, 0]

    score = 0
    scoreDisplay.textContent = score;

    direction = 1
    intervalTime = 1000

    generateApples()

    currentSnake.forEach(index => squares[index].classList.add('snake'));

    //move snake
    timerId = setInterval(move, intervalTime);
}

function move() {
    if ((currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) 
    return clearInterval(timerId);
        

    const tail = currentSnake.pop();

    squares[tail].classList.remove('snake');

    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove apple class
        squares[currentSnake[0]].classList.remove('apple');

        //grow snake
        squares[tail].classList.add('snake');

        //grow snake array
        currentSnake.push(tail);

        //generate new apple
        generateApples();

        //add score
        score++;

        //display score
        scoreDisplay.textContent = score;

        //speed up snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake');
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function control(e) {
    // 39 is right arrow
    // 38 is for the up arrow
    // 37 is for the left arrow
    // 40 is for the down arrow
    if (e.keyCode === 39) {
        direction = 1;
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 40) {
        direction = +width
    }
}

//start game
startBtn.addEventListener('click', startGame)

//create grid
createGrid();

//create snake
currentSnake.forEach(index => squares[index].classList.add('snake'));


//control snake
document.addEventListener('keydown', control)

//generate apples
generateApples()