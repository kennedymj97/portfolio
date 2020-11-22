<script>
	import Project from "../../components/Project.svelte";

	const projects = [
		{
			title: "Building a highly optimised engine for 2048",
			description: "I built a highly optimised engine for the game of 2048 that allowed billions of possible game states to be evaluated in a short amount of time.",
			src: "https://2048-ai.mattkennedy.io/",
			github: "https://www.github.com/kennedymj97/2048-AI",
		},
		{
			title: "Creating a dependently typed neural network from scratch in Haskell",
			description: "Dependent types offer extra compile time guarantees that can be very useful for certain programs. This project makes use of dependant types to provide a guarantee that a neural network has the correct number of connections between the layers. Eliminating a common cause of headaches.",
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
