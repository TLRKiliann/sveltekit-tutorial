export const load = async (serverLoadEvent) => {
	console.log("Load function called in page.server.js");
	const { fetch, params, url, route } = serverLoadEvent;
	console.log({ params, url, route: route.id });
	const { productId } = params;
	const title = "Product details (by id)";
	const res = await fetch(`http://localhost:4000/products/${productId}`);
	const product = await res.json();
	return {
		title,
		product
	};
};