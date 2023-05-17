<script>
	import { invalidateAll } from '$app/navigation';
	export let data;
	const title = data.title;
	const stocks = data.stocks;

	function refresh() {
		return invalidateAll();
	};
</script>

<h1>All Stocks</h1>
<h2>{title}</h2>

{#each stocks as stock}
	<div>
		<a href={`/stocks/${stock.id}`}>Model: {stock.model}</a>
		<p>Number: {stock.number}</p>
		<hr />
	</div>
{/each}

<button on:click={refresh}>Refresh</button>