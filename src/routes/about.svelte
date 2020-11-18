<svelte:head>
  <title>About</title>
</svelte:head>

<article class="mx-auto prose lg:prose-xl">
  <h1>About</h1>

  <p>
    This template is an adapted version of
    <a
      href="https://github.com/Charca/sapper-blog-template"
      target="_blank"
      class="link"
      >this sapper blog template</a
    >. It uses the same format for adding the posts, but includes the addition
    of
    <a href="https://tailwindcss.com/" target="_blank" class="link"
      >tailwindcss</a
    >
    and
    <a
      href="https://tailwindcss.com/docs/typography-plugin"
      target="_blank"
      class="link"
      >tailwindcss/typography</a
    >
    for styling purposes.
  </p>

  <p>
    For more information on how the template works read this blog post
    <span class="font-semibold">LINK THIS WHEN POST IS COMPLETE</span>.
  </p>

  <h1>Adding a new blog post</h1>
  <h2>Metadata</h2>
  <p>
    At the top of the blog post we need to add the metadata for the post using a
    <a
      href="https://cran.r-project.org/web/packages/officedown/vignettes/yaml.html"
      target="_blank"
      >YAML header</a
    >. We need to define the title of the post and the date.
  </p>
  <pre class="language-markdown">
<code class="language-markdown">
---
title: The title of the blog post
date: "2020-11-17T10:47:19Z"
---
</code>
</pre>
  <p>
    If you want to add more metadata you can, just make sure you update the
    relevant files. You will likely need to update
    <code>src/blog/[slug].svelte</code>, <code>src/blog/index.svelte</code> and
    <code>src/blog/index.json.js</code>.
  </p>

  <h2>Excerpt</h2>
  <p>
    This is a description of the post. We extract it in
    <code>src/assets/markdown.js</code> using some special syntax. Below the
    metadata add a comment that contains the word more.
  </p>

  <p></p>
  <pre class="language-markdown">
<code class="language-markdown">
---
title: The title of the blog post
date: "2020-11-17T10:47:19Z"
---

&lt;!-- more --&gt;
</code>
</pre>

  <p>
    Above this comment and below the metadata add a description for the post add
    a description for the post.
  </p>
  <pre class="language-markdown">
<code class="language-markdown">
---
title: The title of the blog post
date: "2020-11-17T10:47:19Z"
---

An example blog post.

&lt;!-- more --&gt;
</code>
</pre>
  <p>
    Keep all of the content you want in the post below the more comment tag.
    Check out the existing blog posts, in the folder
    <code>src/routes/blog/posts</code> for a couple of examples.
  </p>
</article>

