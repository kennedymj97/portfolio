<script>
	export let segment;
</script>

<style lang="postcss">
    .nav-item {
        @apply font-semibold text-lg text-gray-700 hover-hover:hover:text-indigo-700 hover-hover:hover:underline;
    }
</style>

<nav class="w-40 mb-10 md:fixed md:mb-0">
    <span class="text-3xl font-bold">Matthew Kennedy</span>
	<ul class="mt-6">
		<li class="my-2"><a class=nav-item aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
		<li class="my-2"><a class=nav-item aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">Projects</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li class="my-2"><a class=nav-item rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">Blog</a></li>
		<li class="my-2"><a class=nav-item aria-current="{segment === 'contact' ? 'page' : undefined}" href="contact">Contact</a></li>
        <div class="flex items-center mt-4">
            <a target="_blank" href="https://twitter.com/kennedymj97" class="cursor-pointer"><img alt="Twitter logo" src="./Twitter_Logo_WhiteOnBlue.svg" class="h-6 mr-2" /></a> 
            <a target="_blank" href="https://www.linkedin.com/in/matthew-kennedy-94323a159/" class="cursor-pointer"><img alt="LinkedIn logo" src="./LI-In-Bug.png" class="h-6 mr-2" /></a> 
            <a target="_blank" href="https://github.com/kennedymj97" class="cursor-pointer"><img alt="GitHub logo" src="./GitHub-Mark-64px.png" class="h-6" /></a> 
        </div>
	</ul>
</nav>
