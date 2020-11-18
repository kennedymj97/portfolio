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

<style></style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>
  {#each posts as post, index} {#if index}
  <hr class="my-10" />
  {/if}
  <div class="mb-2">
    <h2 class="mb-1 text-2xl font-semibold underline lg:text-3xl">
      <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
    </h2>
    <span class="text-gray-600">{post.printDate} ~ {post.printReadingTime}</span>
  </div>
  <p>{post.excerpt}</p>
  {/each}
</div>
