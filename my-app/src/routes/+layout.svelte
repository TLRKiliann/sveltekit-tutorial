<header class="layout-header">Header</header>
<slot />
<footer class="layout-footer">Footer</footer>

<style>
	.layout-header {
		width: 100%;
		padding: 10px 0px;
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		background: #242424;
		color: cyan;
	}

	.layout-footer {
		position: absolute;
		right: 0px;
		bottom: 0px;
		left: 0px;
		padding: 10px 0px;
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		background: #242424;
		color: cyan;
	}
</style>