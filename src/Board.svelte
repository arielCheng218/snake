
<script>
    
    import {Node, LinkedList} from './LinkedList.js'

    export var startGame = false
    export var gameEndedText = ""

    var BOARD_SIZE = 20
    var board = Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0))

    var foodSquare = -1
    var gameCount = 0

    var snakeDirection = "d"
    var snake = new LinkedList(35)

    // run this when game starts
    $: handleStartGame(startGame)
    $: handleGameOver(startGame)

    function handleStartGame(startGame) {
        console.log('game started is ', startGame)
        if (startGame) {
            // reset board
            board = Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0))
            snakeDirection = "d"
            snake = new LinkedList(35)
            gameCount += 1
            generateFoodSquare()
            // game loop
            if (gameCount == 1) {
                setInterval(mainLoop, 180)
            }
        }
    }

    function handleGameOver(gameStart) {
        if (!gameStart) {
            gameEndedText = "you lost!"
            foodSquare = -1
        }
    }

    function mainLoop() {
        if (startGame) {
            if (snake.head.value % BOARD_SIZE == 0 || snake.head.value % BOARD_SIZE == BOARD_SIZE - 1 || snake.head.value < BOARD_SIZE || snake.head.value > (BOARD_SIZE * BOARD_SIZE) - BOARD_SIZE || snake.cells.slice(1).includes(snake.head.value)) {
                console.log(`snake head ${snake.head.value}`)
                // touched wall, game has ended
                startGame = false
            } else {
                console.log(`snake head ${snake.head.value}`)
                moveSnake()
                updateBoard()
            }
        }
    }

    function moveSnake() {
        var newHeadCoords = getNewHeadCoords()
        snake.addHead(newHeadCoords)
        snake.removeTail()
        handleConsumption(newHeadCoords)
    }
    
    function getNewHeadCoords() {
        if (snakeDirection == "u") {
            return snake.head.value - BOARD_SIZE
        } else if (snakeDirection == "d") {
            return snake.head.value + BOARD_SIZE
        } else if (snakeDirection == "l") {
            return snake.head.value - 1
        } else if (snakeDirection == "r") {
            return snake.head.value + 1
        }
    }

    function handleConsumption(newHeadCoords) {
        if (newHeadCoords == foodSquare) {
            console.log(snake.head.value)
            snake.addTail(getNewTailCoords())
            generateFoodSquare()
        }
    }

    function getNewTailCoords() {
        if (snakeDirection == "u") {
            return snake.tail.value + BOARD_SIZE
        } else if (snakeDirection == "d") {
            return snake.tail.value - BOARD_SIZE
        } else if (snakeDirection == "l") {
            return snake.tail.value + 1
        } else if (snakeDirection == "r") {
            return snake.tail.value - 1
        }
    }

    function updateBoard() {
        board = Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0))
        for (const value of snake.cells) {
            board[(value - (value % BOARD_SIZE)) / BOARD_SIZE][value % BOARD_SIZE] = 1
        }
        board[(foodSquare - (foodSquare % BOARD_SIZE)) / BOARD_SIZE][foodSquare % BOARD_SIZE] = 2
        board = board
    }

    function generateFoodSquare() {
        while (true) {
            var square = getRandomInt(BOARD_SIZE * BOARD_SIZE)
            // food can't be on the edges
            if (square % BOARD_SIZE == 0) {
                square -= 2
            } else if (square % BOARD_SIZE == BOARD_SIZE - 1){
                square += 2
            } else if (square < BOARD_SIZE) {
                square += BOARD_SIZE
            } else if (square > (BOARD_SIZE * BOARD_SIZE) - BOARD_SIZE) {
                square -= BOARD_SIZE
            }
            console.log(`random food square: ${square}`)
            if (!snake.cells.includes(square) && square != foodSquare) { break }
        }
        var col = square % BOARD_SIZE
        var row = (square - col) / BOARD_SIZE
        board[row][col] = 2
        board = board
        foodSquare = square
    }   

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function handleKeydown(e) {
        if (startGame) {
            if (e.code == "ArrowRight") { snakeDirection = "r" }
            else if (e.code == "ArrowLeft") {snakeDirection = "l" }
            else if (e.code == "ArrowUp") { snakeDirection = "u" }
            else if (e.code == "ArrowDown") { snakeDirection = "d" } 
            else { return }
        }
    }

</script>

<style>
    .board {
        outline: 2px solid #7c7c7c;
        height: 500px;
        width: 500px;
        margin: auto;
        top: 50%;
    }
    .empty-cell {
        display: inline-block;
        height: 25px;
        width: 25px;
        outline: 1px solid #7c7c7c;
        margin-bottom: -4px;

    }
    .snake-cell {
        display: inline-block;
        height: 25px;
        width: 25px;
        background-color: rgb(102, 211, 88);
        outline: 1px solid #7c7c7c;
        margin-bottom: -4px;

    }
    .food-cell {
        display: inline-block;
        height: 25px;
        width: 25px;
        background-color: rgb(241, 86, 86);
        outline: 1px solid #7c7c7c;
        margin-bottom: -4px;
    }
</style>

<svelte:window on:keydown={handleKeydown}/>
<div class="board">
{#each board as row}
    {#each row as cell}
        <div class={cell == 0 ? "empty-cell" : cell == 1 ? "snake-cell" : "food-cell"}></div>
    {/each}
{/each}
</div>
