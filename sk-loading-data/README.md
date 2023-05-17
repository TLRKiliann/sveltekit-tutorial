# External API simulation with load

## Install

$ pnpm install server-json

package.json config :

```
"server": "json-server --watch db.json --port 4000"
```

$ pnpm run server

## LOAD

There are 2 contexts to use `load` :
- universal load action
- server load action

Universal load is for client side and server side.
Not for sensitive data.

Server load action is for credentials & sensitive data.
It has not to return value.

load returns always an object that it will be catch by data in `+age.svelte` (UI).

---

## Universal load action

products/+page.js

load return always an object.

Without `loadEvent` an error appear in the console.

```
(+page.js)

export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const title = "List of available products"
	const res = await fetch('http://localhost:4000/products')
	const products = await res.json()
	return {
		title,
		products
	}
}
```

products/+page.svelte

`data` refers always to the `object` provided by `load`.

```
(+page.svelte)

<script>
  export let data;
  const products = data.products;
</script>

<h1>Products {data.title}</h1>

{#each products as product}
  <div>
    <h2>{product.title}</h2>
    <p>{product.description}</p>
    <hr />
  </div>
{/each}
```

## load with API SvelteKit which calls data from external API.

For this example, you can use server-json to simulate external api.

address/ :
- +page.svelte (UI)
- +page.js (load)

api/postcodes/ :
- +server.js (fetch data from external API)

When user reach the `+page.svelte (UI)`, data is loaded by `+page.js` **(fetch('/api/postcodes'))** from `+server.js (api)`. `+server.js` file fetch data from external api **(fetch('http://localhost:4000/postcodes'))**.

## Server load function

keyword : serverLoadEvent

`Server load function is useful when you have to work with sensitive information such as credentials or API keys.`

Look at products folder !

product.svelte is the Component

+page.svelte calls product.svelte

products/:
- +page.js (loadEvent)
- +page.server.js (serverLoadEvent)

`+page.server.js cannot return Component as +page.js, because it uses serverLoadEvent & it cannot stringify a function (component constructor are not serializables) !`

---

Look at [productId]

keywords: serverLoadEvent - params - productId

With serverLoadEvent (+page.server.js), we return object that contains product & that we can see in UI (+page.svelte).

We can also see, the `{ params, url, route: route.id }` with console.log().

## Error

Into folder [productId]

```
(+page.server.js)

import {error} from '@sveltejs/kit'

if (productId > 3) {
	throw error(404, 'Product not found');
}
```

```
(+error.svelte)

<script>
	import { page } from '$app/stores'; 
</script>

<h1>
	{$page.status}: {$page.error.message}
</h1>
```

If we prefer a more friendly message, we can erase {$page.status}.

or we can do that as follow as well :

```
(+page.server.js)

import {error} from '@sveltejs/kit'

if (productId > 3) {
	throw error(404,{
		message: 'Product not found',
		hint: 'try a different product'
	});
}
```

```
(+error.svelte)

<script>
	import { page } from '$app/stores'; 
</script>

<h1>
	{$page.error.message}
</h1>
<p>
	{$page.error.hint}
</p>
```

## Redirect

```
(+page.server.js)

import { redirect } from '@sveltejs/kit'

if (productId > 3) {
	throw redirect(307, '/products');
}
```

## Layout

To see features from `db.json` with product by id, we need to set layouts.

Look at products folder!

- +layout.js (loadEvent)
- +layout.svelte (UI)

We can also use +layout.server.js if serverLoadEvent is required.

---

We can also set layouts in routes folder, by creating `routes/+layout.svelte` & `routes/+layout.js` to set notification with `products/+page.js`.

We also set header of page as follow :

```
<script>
	import { page } from '$app/stores';
	export let data;
	const { username } = data;
</script>

<svelte:head>
	<title>{$page.data.title || "Codevolution"}</title>
</svelte:head>

{#if $page.data.notification}
	<p>{$page.data.notification}</p>
{/if}

<div>Welcome {username}</div>

<slot />
```
