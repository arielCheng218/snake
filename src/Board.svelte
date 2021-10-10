
<script>

    export var startGame = false

    var board = Array(10).fill(0).map(row => new Array(10).fill(0))
    var foodSquare = -1

    class Node {
        constructor(value) {
            this.value = value
            this.next = null
        }
    }

    var snakeDirection = ""

    class Snake {
        constructor(value) {
            this.head = new Node(value)
        }
        updateBoard() {
            this.clearBoard()
            this.drawSnake()
        }
        clearBoard() {
            board = Array(10).fill(0).map(row => new Array(10).fill(0))
            var col = foodSquare % 10
            var row = (foodSquare - col) / 10
            board[row][col] = 2
        }
        drawSnake() {
            var node = this.head
            // traverse linked list
            while (true) {
                const value = node.value
                var col = value % 10
                var row = (value - col) / 10
                board[row][col] = 1
                board = board
                if (node.next == null) {
                    break
                } else {
                    node = node.next
                }
            }
        }
        moveSnake() {
            var node = this.head
            if (snakeDirection == "u") {
                this.head.value -= 10
            } else if (snakeDirection == "d") {
                this.head.value += 10
            } else if (snakeDirection == "l") {
                this.head.value -= 1
            } else if (snakeDirection == "r") {
                this.head.value += 1
            }
            console.log(node)
            // traverse linked list
            while (true) {
                if (node.next == null) {
                    break
                } else {
                    node = node.next
                }                
            }
        }
    }

    var snake = new Snake(35)

    // run this when game starts
    $: handleStartGame(startGame)

    function handleStartGame(startGame) {
        console.log('game started is ' + String(startGame))
        board = Array(10).fill(0).map(row => new Array(10).fill(0))
        snake.updateBoard()
        if (startGame) {
            // reset board
            generateFoodSquare()
            // game loop
            window.setInterval(mainLoop, 250)
        }
    }

    function mainLoop() {
        snake.moveSnake()
        snake.updateBoard()
    }
    
    function generateFoodSquare() {
        var square = getRandomInt(100)
        var col = square % 10
        var row = (square - col) / 10
        console.log(row, col)
        board[row][col] = 2
        board = board
        foodSquare = square
    }   

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function handleKeydown(e) {
        console.log(e.code)
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
        height: 50px;
        width: 50px;
        outline: 1px solid #7c7c7c;
        margin-bottom: -4px;

    }
    .snake-cell {
        display: inline-block;
        height: 50px;
        width: 50px;
        background-color: rgb(102, 211, 88);
        outline: 1px solid #7c7c7c;
        margin-bottom: -4px;

    }
    .food-cell {
        display: inline-block;
        height: 50px;
        width: 50px;
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
