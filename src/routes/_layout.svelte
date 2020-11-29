<script>
	import Nav from '../components/Nav.svelte';
	import GoogleAnalytics from '../components/GoogleAnalytics.svelte';
	import { stores } from '@sapper/app';

	export let segment;
</script>

<GoogleAnalytics {stores} id={"G-JCJ44Y6QZY"} />
<div class="relative flex flex-col p-6 mx-auto max-w-screen-lg md:flex-row">
  <Nav {segment}/>
  <main class="flex-grow md:ml-40 lg:ml-56">
  	<slot></slot>
  </main>
</div>

