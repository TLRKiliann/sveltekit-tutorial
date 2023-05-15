# Sveltekit Tutorial

Simple tutorial about routing.

# create a new project in my-app
pnpm create svelte@latest my-app

Options validated :

- skeleton
- TypeScript
- eslint
- prettier
- vitest for Unit Testing

```
cd my-app
pnpm install
```

## Developing

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

## Into routes folder create

product/[productId]/+page.svelte

To access to this page, enter in you browser:

localhost:5173/product/1

Results appear into the page

## Dynamique routing

product/[productId]/reviews/[reviewId]/+page.svelte

To access to this page, enter in you browser:

localhost:5173/product/1/reviews/1

Results appear into the page

## Building

To create a production version of your app:

npm run build


You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## doc with [...slug]

In doc folder, I've created a folder [...slug] & into this folder, I've created a file +page.svelte.
With [...slug] we can map all segments what we want, as example : 

http://localhost:5173/doc

http://localhost:5173/doc/1

http://localhost:5173/doc/concept1

http://localhost:5173/doc/routing

http://localhost:5173/doc/routing/catch-all-routes

We have a better ranking SEO by this organisation with segments.

## to switch among lang

We cannot build a folder [[lang]] in routes, because it will generate a conflict with routing.
For that, it's better to build a "marketing" folder to create inside it a [[lang]] folder with a page.
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
