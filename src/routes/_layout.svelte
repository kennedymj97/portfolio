<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<div class="relative flex mx-auto mt-6 max-w-screen-lg">
  <Nav {segment}/>
  <main class="relative flex-grow">
  	<slot></slot>
  </main>
</div>

