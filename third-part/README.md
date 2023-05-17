# third-part

$ pnpm install json-server

package.json config :

`"server": "json-server --watch db.json --port 4000"`

$ pnpm run server

## Refresh a page (under development)

keywords: invalidate() - invalidateAll() - depends

```
(+page.svelte)

<script>
	import { invalidate } from '$app/navigation';	// look at here !
	export let data;
	const title = data.title;
	const stocks = data.stocks;

	function refresh() {							// look at here !
		invalidate('stocks:actively-trading');
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

<button on:click={refresh}>Refresh</button>			// look at here !
```

```
(+page.js)

export const load = async (loadEvent) => {


	const { fetch, depends } = loadEvent; 	// look at here !
	depends('stocks:actively-trading');   	// look at here !


	const title = 'stock number';
	const response = await fetch('http://localhost:4000/stocks');
	const stocks = await response.json()
	return {
		title,
		stocks
	}
}
```

You can also use invalidateAll()

```
(+page.svelte)

<script>
	import { invalidateAll } from '$app/navigation';
	
	...

	function refresh() {
		invalidateAll();
	};
	...
```

## Links options

In page app.html we can see `data-sveltekit-preload-data`.
Open network in you browser & erase all. Now you can observe behavior when you mouseover the links (`<a href=.../>`), or by clicking on it.

### data-sveltekit-preload-data

```
Preload the page with mouseover the link :
- data-sveltekit-preload-data="hover"

Preload all pages except db.json (it's equal to mousedown):
-data-sveltekit-preload-data="tap"

Nothing is preloaded :
- data-sveltekit-preload-data="off"
```

### data-sveltekit-preload-code

```
With "hover", no data json file appear in browser
- data-sveltekit-preload-code="hover"

It's quite same thing as data above :
- data-sveltekit-preload-code="tap"

With "eager", links will be preloaded straight away without hover on click
- data-sveltekit-preload-code="eager"

Viewport :
- data-sveltekit-preload-code="viewport"

<x class="tall">

<div data-sveltekit-preload-code="viewport">
	...
</div>

<style>
	.tall {
		height: 100vh;
}
</style>
```

## data-sveltekit-reload

`<a href="..." data-sveltekit-reload>Go to...</a>`

We can observe a spinner effect when we navigate in another page.

## data-sveltekit-noscroll

`<a href="..." data-sveltekit-noscroll>Go to...</a>`

Preserve no-scroll between pages. It's possible to use css for adding effects.

---

## Preload programmatically

keywords : goto - preloadData - preloadCode - focus - mouseover - mousedown (same as tap) - mousedown - async await

Preaload data with a button.

```
<script>
	import { goto, preloadCode } from '$app/navigation';
</script>

<button 
	on:focus={async () => {
		await preloadCode('/stocks')
	}}
	on:mouseover={async () => {
		async preloadCode('/stocks')
	}}
	on:click={() => goto('/stocks')}
>
	Click
</button>
```

With the code above, we cannot see the preloading of json file with `preloadCode`, but it's possible by replacing `preloadCode` with `preloadData`.