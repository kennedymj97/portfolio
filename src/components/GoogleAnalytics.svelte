<svelte:head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JCJ44Y6QZY"></script>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  const { page } = stores();

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
	window.gtag = function gtag() {
	  window.dataLayer.push(arguments)
	}
	window.gtag("js", new Date())
	window.gtag("config", "G-JCJ44Y6QZY", { 'send_page_view': false })
  }

  $: {
    if (typeof gtag !== "undefined"){
	  window.gtag("config", "G-JCJ44Y6QZY", {
	    page_path: $page.path,
	  });
    }
  }
</script>
