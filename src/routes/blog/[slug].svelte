<script context="module">
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="mx-auto prose lg:prose-xl">
  <header>
    <p>{post.printDate} ~ {post.printReadingTime}</p>
    <h1>{post.title}</h1>
    <hr />
  </header>
  <article>{@html post.html}</article>
</div>
