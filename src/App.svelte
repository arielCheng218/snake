
<script>
	import Board from './Board.svelte' 

	var score = 1
	var isPlaying = false

	function handleKeydown(e) {
		if (e.code == "Space") {
			isPlaying = !isPlaying
		}
	}
</script>

<style>
	main {
		background-color: #000000;
		width: 100%;
		height: 100%;
	}

	h2 {
		padding-top: 4%;
		margin: 0;
		padding-bottom: 2%;
		color: #ffffff;
		opacity: 60%;
		font-size: 48px;
		text-align: center;
		letter-spacing: 0.5px;
		font-weight: 600;
		font-family: 'poppins';
	}

	p {
		margin: 0;
		color: #ffffff;
		font-size: 24px;
		text-align: center;
		letter-spacing: 0.5px;
		padding-bottom: 3%;
		font-family: 'poppins';
	}

</style>

<svelte:window on:keydown={handleKeydown}/>

<main>
	<h2>Snake</h2>
	{#if isPlaying}
		<p>Score: {score}</p>
	{:else}
		<p>press SPACE to start</p>
	{/if}
	<Board startGame={isPlaying}/>
</main>

