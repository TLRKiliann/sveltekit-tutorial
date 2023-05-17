<script>
	export let data;
	const title = data.title;
	const { stock } = data;
</script>

<h1>{title}</h1>
<h2>{stock.model}</h2>
<h2>{stock.number}</h2>

