<script>
	import { invalidate } from '$app/navigation';
	export let data;
	const title = data.title;

	function refresh() {
		return invalidate('stocks:actively-trading');
	};
</script>

<h1>All Stocks</h1>
<h2>{title}</h2>

<div>
	<hr />
	<h3>Model: {data.stock_a.model} - Number: {data.stock_a.number}</h3>
	<hr />
	<h3>Model: {data.stock_b.model} - Number: {data.stock_b.number}</h3>
	<hr />
	<h3>Model: {data.stock_c.model} - Number: {data.stock_c.number}</h3>
	<hr />
</div>


<button on:click={refresh}>Refresh</button>