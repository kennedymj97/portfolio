<script>
	import Project from "../../components/Project.svelte";

	const projects = [
		{
			title: "Optimising the 2048 Game Engine",
			description: "This project optimises the engine for the game 2048, allowing billions of game states to be evaluated in a short period of time. This makes AI algorithms which require a large search space possible.",
			src: "https://2048-ai.mattkennedy.io/",
			github: "https://www.github.com/kennedymj97/2048-AI",
		},
		{
			title: "Haskell Net: A Dependently Typed Neural Network Library",
			description: "Dependent types enable logical errors to be caught at compile time. This project makes use of dependant types to provide a guarantee that the neural networks you create have valid connections between the layers. Eliminating a common cause of bugs.",
			src: "https://kennedymj97.github.io/haskell-net/frontend/index.html",
			github: "https://www.github.com/kennedymj97/haskell-net",
		}
	]
</script>

<svelte:head>
    <title>Matthew Kennedy | Projects</title>
</svelte:head>

<h1>Projects</h1>
{#each projects as project, index} {#if index}
  <hr class="my-10" />
{/if}
  <Project title={project.title} description={project.description} src={project.src} github={project.github} />
{/each}
