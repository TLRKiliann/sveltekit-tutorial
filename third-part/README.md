# third-part

$ pnpm install json-server

package.json config :

`"server": "json-server --watch db.json --port 4000"`

$ pnpm run server

- stock
- Links options


```
data-sveltekit-preload-data="hover"

data-sveltekit-preload-data="tap"

data-sveltekit-preload-data="off"

With "hover", no data json file appear in browser
data-sveltekit-preload-code="hover"

data-sveltekit-preload-code="tap"

With "eager", links will be preloaded straight away without hover on click
data-sveltekit-preload-code="eager"


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
