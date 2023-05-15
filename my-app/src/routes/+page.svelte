<script>
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	const handleOrder = () => {
		console.log("button clicked");
		goto('/products');
	};
	beforeNavigate((navigation) => {
		console.log({before: navigation})
	});
	afterNavigate((navigation) => {
		console.log({after: navigation})
	});
</script>

<h1>Welcome to SvelteKit</h1>

<div>
	<a href="/marketing">Marketing EN</a>
	<a href="/marketing/es">Marketing ES</a>
	<a href="/marketing/fr">Marketing FR</a>
	<a href="/products">Products</a>
	<a href="/doc">Doc</a>
	<a href="/about">About</a>
</div>

<button on:click={handleOrder}>
	Place Order
</button>