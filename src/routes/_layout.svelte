<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<div class="relative flex flex-col p-6 mx-auto max-w-screen-lg md:flex-row">
  <Nav {segment} />
  <main class="flex-grow md:ml-40 lg:ml-56">
  	<slot></slot>
  </main>
</div>

