<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // IMPORTANT: the name of the game component must be the same as the unique path for the page in the url, this is to ensure that the keyboard/move events only act on the current page
  let gameManager;
  let aiController = null;
  let hexString;
  let wasm;

  onMount(async () => {
    const { default: GameManager } = await import('../js/game_manager.js');
    const { default: KeyboardInputManager } = await import(
      '../js/keyboard_input_manager.js'
    );
    const { default: HTMLActuator } = await import('../js/html_actuator.js');
    const { default: LocalStorageManager } = await import(
      '../js/local_storage_manager.js'
    );
	const { WasmExpectimax: wasmExpectimax, WasmSnake: wasmSnake } =  await import('2048-ai-wasm');
    wasm = wasmExpectimax.new();
	const { default: AIController } = await import('../js/ai_controller.js');

    // Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(function () {
      gameManager = new GameManager(
        4,
        KeyboardInputManager,
        HTMLActuator,
        LocalStorageManager,
		"2048"
      );
	  aiController = new AIController(gameManager, wasm);
	  startAI();
      hexString = gameManager.gridCellsToHexString(gameManager.grid.cells);
    });
  });

  onDestroy(() => {
	  pauseAI();
  });

  function handleGameManagerUpdate(event) {
    if (gameManager && !gameManager.over) {
	  gameManager = gameManager;
    }
  }

  $: {
	  if (gameManager) {
	    hexString = gameManager.gridCellsToHexString(gameManager.grid.cells);
	  }
  }

  function startAI () {
	  if (aiController) {
		  aiController.start();
	  }
  }

  function pauseAI () {
	  if (aiController) {
		  aiController.pause();
	  }
  }
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>2048</title>

  <link href="/2048.css" rel="stylesheet" type="text/css" />
  <link rel="apple-touch-icon" href="meta/apple-touch-icon.png" />
  <link
    rel="apple-touch-startup-image"
    href="meta/apple-touch-startup-image-640x1096.png"
    media="(device-width: 320px) and (device-height: 568px) and
    (-webkit-device-pixel-ratio: 2)" />
  <!-- iPhone 5+ -->
  <link
    rel="apple-touch-startup-image"
    href="meta/apple-touch-startup-image-640x920.png"
    media="(device-width: 320px) and (device-height: 480px) and
    (-webkit-device-pixel-ratio: 2)" />
  <!-- iPhone, retina -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />

  <meta name="HandheldFriendly" content="True" />
  <meta name="MobileOptimized" content="320" />
  <meta
    name="viewport"
    content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0,
    maximum-scale=1, user-scalable=no, minimal-ui" />
</svelte:head>

<svelte:window on:keydown={handleGameManagerUpdate} on:click={handleGameManagerUpdate} />

<div class="container">
  <div class="flex justify-center w-full">
    <div class="mr-2 score-container">0</div>
    <div class="best-container">0</div>
  </div>

  <div class="my-2 game-container">
    <div class="game-message">
      <p />
      <div class="lower">
		<a class="keep-playing-button">Keep going</a>
		<a class="retry-button">Try again</a>
      </div>
    </div>

    <div class="grid-container">
      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>
      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>
      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>
      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>
    </div>

    <div class="tile-container" />
  </div>
  <div class="flex justify-center w-full">
	<a class="restart-button">New Game</a>
  </div>
  <!--
  <p class="game-explanation">
    Forked by Matthew Kennedy. Originally created by
    <a class="link" href="https://play2048.co/" target="_blank">
      Gabriele Cirulli.
    </a>
    Based on
    <a
      class="link"
      href="https://itunes.apple.com/us/app/1024!/id823499224"
      target="_blank">
      1024 by Veewo Studio
    </a>
    and conceptually similar to
    <a class="link" href="http://asherv.com/threes/" target="_blank">
      Threes by Asher Vollmer.
    </a>
  </p>
  -->
</div>
