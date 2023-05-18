# sk-form-action

That's about form with auth & simple form.

There are 3 folders :
- auth
- authentify
- auth-modal

- auth is basic auth

- authentify is the right auth with sveltekit.

- auth-modal is for testing authentify as explain in lines below.

keywords : request - cookies - url - redirect - redirectTo - fail

## To verify auth

In routes/auth-modal/+page.svelte file, we have the code as below :

```
<script>
	export let form;
</script>

<form method='post' action='/authentify?/login'>
	<p>{form?.message || ""}</p>
	<input type="text" name="username" placeholder="Username" />
	<input type="password" name="password" placeholder="Password" />
	<button type="submit">Login</button>
	<button formaction="/authentify?/register">Register</button>
</form>
```

This code permits to verify if auth function of `routes/authentify/+page.server.js` file works correctly.

## To preserve username (don't do that with password !)

routes/authentify/+page.server.js

```
import { fail } from '@sveltejs/kit';

		if (!username || !password) {
			return fail(400, {
				username,
				message: "Missing username or password"
			})
		}
```

routes/authentify/+page.svelte

```
	<input type="text" name="username" placeholder="Username" value={form?.username ?? ''} />
```

## To redirect

keywords : redirect - redirectTo - url - searchParams - get

synthax : 
- ?/register&redirectTo 
- $page.url.searchParams.get('redirectTo') || '/'; 
- throw redirect(303, url.searchParams.get('redirectTo') || '/');

If user isn't logged in or registered (no cookies set), he's redirected to the login page (authentify).

routes/news/+page.server.js

```
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies, url }) => {
	if (!cookies.get("username")) {
		throw redirect(307, `/authentify?redirectTo=${url.pathname}`);
	}
```

If user is logged in, he's automatically redirect to news page.

routes/authentify/+page.svelte

```
<script>
	import { page } from '$app/stores';
	
	...

	const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
</script>

<form method='post' action='?/login&redirectTo={redirectTo}'>
	
	...

	<button formaction="?/register&redirectTo={redirectTo}">Register</button>
</form>
```

routes/authentify/+page.server.js

```
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies, url }) => {
		
		...

		if (!username || !password) {
			return fail(400, {
				username,
				message: "Missing username or password"
			})
		}		
		cookies.set('username', username, {path: '/'});
		throw redirect(303, url.searchParams.get('redirectTo') || '/');
	},
```