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

## Server load action

keyword : serverLoadEvent

+page.server.js

---