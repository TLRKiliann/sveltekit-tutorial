<script>
	import { page } from '$app/stores';
	console.log($page.params.slug);
	const slugArr = $page.params.slug.split('/');
</script>

{#if slugArr.length === 1}
<h1>Viewing doc for feature {slugArr[0]}</h1>
{:else if slugArr.length === 2}
<h1>Viewing doc for feature {slugArr[0]} & concept {slugArr[1]}</h1>
{/if}