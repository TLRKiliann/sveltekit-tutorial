# External API simulation with load

## Install

$ pnpm install server-json

package.json config :

```
"server": "json-server --watch db.json --port 4000"
```

$ pnpm run server

## LOAD

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

data refers always to the load that it returns an object.

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

## load with API SvelteKit that call data from external API.

address/ :
- +page.svelte (UI)
- +page.js (load)

api/postcodes/ :
- +server.js (fetch data from external API)

When user reach the `+page.svelte (UI)`, data is loaded by `+page.js` from `+server.js (api)`.
`+server.js` fetch data from external api.