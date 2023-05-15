# Sveltekit Tutorial

Simple tutorial about routing.

## create a new project in my-app
$ pnpm create svelte@latest my-app

Options validated :

- skeleton
- TypeScript
- eslint
- prettier
- vitest for Unit Testing

```
$ cd my-app
$ pnpm install
```

## Developing

$ pnpm run dev

# or start the server and open the app in a new browser tab

$ pnpm run dev -- --open

## Building

To create a production version of your app:

$ pnpm run build

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Into routes folder create

product/[productId]/+page.svelte

To access to this page, enter in you browser:

`localhost:5173/product/1`

Results appear into the page

## Dynamique routing

product/[productId]/reviews/[reviewId]/+page.svelte

To access to this page, enter in you browser:

`localhost:5173/product/1/reviews/1`

Results appear into the page

## doc with [...slug]

In doc folder, I've created a folder [...slug] & into this folder, I've created a file +page.svelte.
With [...slug] we can map all segments what we want, as example : 

http://localhost:5173/doc

http://localhost:5173/doc/1

http://localhost:5173/doc/concept1

http://localhost:5173/doc/routing

http://localhost:5173/doc/routing/catch-all-routes

We have a better ranking SEO by this organisation with segments.

## Switch among lang

We cannot build a folder [[lang]] in routes, because it will generate a conflict with routing.
For that, it's better to build a `marketing` folder to create inside it a [[lang]] folder with a page.
In +page.svelte we have to precise lang :

```
const greetings = {
	en: 'Hello',
	es: 'Ola!',
	fr: 'Bonjour'
};

const { lang = 'en' } = $page.params;
```

At this time, for showing **greeting** we can use : 

```
const greeting = greetings[lang];
```

## Link (navigation)

- Synthax of link (sveltekit recommand to not use `<link>`) :

```
<a href="/example"></a>
```

- Synthax to reach second segment :

```
<script>
    import { page } from '$app/stores';
    const productId = $page.params.productId;
    const reviewId = $page.params;
</script>

<a href="/">Home</a>

<h1>Product details by ID</h1>

<h2>{productId}</h2>

<a href={`/products/${productId}/reviews/1`}>review 1</a>
<a href={`/products/${productId}/reviews/2`}>review 2</a>
<a href={`/products/${productId}/reviews/3`}>review 3</a>
```

---

## beforNavigate - afterNavigate & goto

****keywords: goto - navigation**

- Look at console into your browser during navigation.

```
(routes/+page.svelte)

<script>
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	const handleOrder = () => {
		console.log("button clicked");
		goto('/products');
	};
	beforeNavigate((navigation) => {
		console.log({before: navigation})
	});
	afterNavigate((navigation) => {
		console.log({after: navigation})
	});
</script>

<h1>Welcome to SvelteKit</h1>

<div>
	<a href="/marketing">Marketing EN</a>
	<a href="/marketing/es">Marketing ES</a>
	<a href="/marketing/fr">Marketing FR</a>
	<a href="/products">Products</a>
	<a href="/doc">Doc</a>
	<a href="/about">About</a>
</div>

<button on:click={handleOrder}>
	Place Order
</button>
```

## +layout.svelte

For all pages this file should be create in routes folder.

Keep code of your page by :

```
<slot />
```

```
<header class="layout-header"></header>
<slot />
<footer class="layout-footer"></footer>

<style>
	.layout-header {...}
	.layout-footer {...}
</style>
```

## (auth)

auth folder in routes folder take parenthesis to avoid segment.
Segment auth for login or for register.
By this, we can directly access to login or to register by "/login" or "/register".

## password

3 folders have been created :

- forgot
- info
- reset

We can play with layout to choose if layout of auth or/& password should appear or not.

- None layouts => +page@.svelte
- No auth layout => +page@(auth).svelte

To verify, page of `forgot` allows us to see the 2 layouts.

---

## API

Look at `lib/comments.ts`

GET

```
import { comments } from '$lib/comments.ts'

export function GET() {
	return new Response(JSON.stringify(comments), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
```

Instead to do something like above, we can use `json` like that.

```
import { json } from '@sveltejs/kit'
import { comments } from '$lib/comments.ts'

export function GET() {
	return json(comments);
}
```

It's uses less lines of code.

To test it in REST with `thunder client` of vscode:

`http://[[::1]]:5173/api/comments`

---

POST

```
import { comments } from '$lib/comments.ts'

export async function POST(requestEvent) {
	const { rquest } = requestEvent;
	const { text } = await.rquest.json();
	const newComment = {
		id: comments.length + 1,
		text
	};
	comments.push(newComment);
	return new Response(JSON.stringify(newComment), { status: 201 });
}
```

With `json` we can write less lines of code.

```
import { json } from '@sveltejs/kit'
import { comments } from '$lib/comments.ts'

export async function POST(requestEvent) {
	const { rquest } = requestEvent;
	const { text } = await.rquest.json();
	const newComment = {
		id: comments.length + 1,
		text
	};
	comments.push(newComment);
	return json(newComment, { status: 201 });
}
```

## Dynamic API Route

`routes/api/comments/[commentId]/+server.ts`

GET

**keywords : commentId - params**

```
import { json } from '@sveltejs/kit'
import { comments } from '$lib/comments.ts'

export async function GET(requestEvent) {
	const {params} = requestEvent;
	const {text} = params;
	const comment = comments.find((comment) => comment.id === parseInt(commentId));
	return json(comment);
}
```

Use the GET method from vscode to test it with `thunder client`.


