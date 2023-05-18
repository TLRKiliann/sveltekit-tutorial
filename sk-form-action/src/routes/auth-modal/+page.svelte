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