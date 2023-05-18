# third-part

$ pnpm install json-server

package.json config :

`"server": "json-server --watch db.json --port 4000"`

$ pnpm run server

## Refresh a page

keywords: invalidate() - invalidateAll() - depends

To display the refresh effect by clicking button, make some change in db.json & observe when you click on the button refresh.

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

keywords : goto - preloadData - preloadCode - depends() - focus - mouseover - mousedown (same as tap) - mousedown - async await

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

depends

```
export const load = async (loadEvent) => {
	
	const { fetch, depends } = loadEvent;	// here !
	depends('stocks:actively-trading');		// here !
	
	const title = 'Stock per model/number';
	const response_A = await fetch('http://localhost:4000/stockA');
	const response_B = await fetch('http://localhost:4000/stockB');
	const response_C = await fetch('http://localhost:4000/stockC');
	return {
		title,
		stock_a: response_A.json(),
		stock_b: response_B.json(),
		stock_c: response_C.json()
	};
};

export const ssr = false;
export const csr = true;
```

## CSR & SSR

keywords : export const ssr/csr = true or false;

look at : /stocks/+page.js

We can set code below with universal load :

```
export const ssr = true;
export const csr = true;
```
We can only use ssr like this :

```
export const ssr = true;
export const csr = false;
```
As well, we can only use csr :

```
export const ssr = false;
export const csr = true;
```

Or none of them :

```
export const ssr = false;
export const csr = false;
```

## CSR & SSR with prerender

keywords : export const prerender: true; // or 'auto';

Into generated folder of .svelte-kit folder there are 2 folders :
- client
- server

**pnpm run build**

`pnpm run build` generate an `output` folder which containes 2 folders :
- client
- server

In a `+page.js` that contains universal load :

`export const prerender = true;`

when we use `pnpm run build`, we can see that the prerender in the console. We can see a new folder prerender in `output` folder.

`pnpm run preview` don't care `export const prerender = true` & run in another port;

We can also use :
- `export const prerender = true`;
- `export const csr = false;`

$ pnpm run build => we cannot see log anymore.

We can also use prerender with api :

/api/current-time

`export const prerender = true;`

$ pnpm run build

$ pnpm run preview

As you can see, prerender contains current-time.

If we delete `export const prerender = true;` in `/api/current-time/+server.js` page & let an `export const prerender = true;` in a +page.js that calls `/api/current-time/+server.js` page, the prerendered folder will be done for the api too !

I let you try by using :
- pnpm run build
- pnpm run preview

## prerender with dynamic api routes

In products, we can use `export const prerender = true`. We also can use it in [productId]. Take a look in the prerendered folder.

But it's not necessarly to do this.

```
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			crawl: true,
			entries: ['/']
		}
	}
};
export default config;
```

If we only want to select some file to .svelte-kit/generated/prerendered/pages :

```
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			crawl: false,
			entries: ['/', '/products', '/products/1', '/products/2']
		}
	}
};
export default config;
```

$ pnpm run build

$ pnpm run preview

Now console shows us a problem when we click on product 3 (/products/3).

To resolve this issue, we can use in folder /product/[productId]/+page.js :

`export const prerender = 'auto';`