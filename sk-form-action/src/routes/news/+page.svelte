<script>
	export let data;
</script>

<h1>News Page</h1>
{#each data.news as art}
	<h2>{art.title}</h2>
{/each}