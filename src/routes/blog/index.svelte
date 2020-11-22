<script context="module">
  export function preload() {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>Matthew Kennedy | Blog</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>
  {#each posts as post, index} {#if index}
  <hr class="my-10" />
  {/if}
  <h2 class="mb-4 text-2xl link lg:text-3xl">
    <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
  </h2>
  <p class="mb-4">{post.excerpt}</p>
  <span class="text-gray-600">{post.printDate} ~ {post.printReadingTime}</span>
  {/each}
</div>
