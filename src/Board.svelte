
<script>
    var board = Array(10).fill(0).map(row => new Array(10).fill(0))
    export var startGame = false

    // run this when game
    $: handleStartGame(startGame)

    function handleStartGame(startGame) {
        console.log('game started is ' + String(startGame))
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
        outline: 1px solid #7c7c7c;
    }
</style>

<div class="board">
{#each board as row}
    {#each row as cell}
        <div class={cell == 0 ? "empty-cell" : "snake-cell"}></div>
    {/each}
{/each}
</div>
