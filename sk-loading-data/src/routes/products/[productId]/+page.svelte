<script>
	export let data;
	const title = data.title;
	const product = data.product;
</script>

<h1>Product details (by id) {title}</h1>
<div>
	<h2>
		{product.title} - CHF{product.price} - {product.description}
	</h2>
</div>