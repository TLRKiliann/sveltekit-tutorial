<script>
  export let product;
</script>

<h1>product page</h1>

<a href={`/products/${product.id}`}>{product.title}</a>
<p>{product.description}</p>
<hr />
