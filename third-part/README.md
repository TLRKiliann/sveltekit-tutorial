# third-part

$ pnpm install json-server

package.json config :

`"server": "json-server --watch db.json --port 4000"`

$ pnpm run server

## Links options

In page app.html we can see `data-sveltekit-preload-data`.
Open network in you browser & erase all. Now you can observe behavior when you mouse-over the links (`<a href=.../>`), or by clicking on it.

### data-sveltekit-preload-data

```
Preload the page with mouse-over the link :
- data-sveltekit-preload-data="hover"

Preload all pages except db.json :
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
