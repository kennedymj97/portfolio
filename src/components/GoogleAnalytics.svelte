<script>
  import { stores } from '@sapper/app';
  const { page } = stores();

  $: {
    if (typeof gtag !== "undefined"){
	  window.gtag("config", "G-JCJ44Y6QZY", {
	    page_path: $page.path,
	  });
    }
  }
</script>
