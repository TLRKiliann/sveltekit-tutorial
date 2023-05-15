<script>
    export let productPerCent = 100;
</script>

<a href="/">Home</a>

<h1>Product Title</h1>

<h1>Product details by ID</h1>
<a href="/products/1">Product 1 :</a>
<a href="/products/2">Product 2 :</a>
<a href="/products/3">Product 3 :</a>
<a href={`/products/${productPerCent}`}>
	Product: {productPerCent}
</a>
