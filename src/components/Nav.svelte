<script>
	export let segment;
</script>

<style lang="postcss">
    .nav-item {
        @apply font-semibold text-lg text-gray-700 hover:text-purple-700 hover:underline my-2;
    }
</style>

<nav class="w-40 mb-10 md:fixed md:mb-0">
    <span class="text-3xl font-bold">Matthew Kennedy</span>
	<ul class="mt-6">
		<li class=nav-item><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li class=nav-item><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">Blog</a></li>
		<li class=nav-item><a aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">Projects</a></li>
		<li class=nav-item><a aria-current="{segment === 'contact' ? 'page' : undefined}" href="contact">Contact</a></li>
	</ul>
</nav>
