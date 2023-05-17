import Product from './product.svelte'

export const load = async (loadEvent) => {
	console.log("Load function called in page.js");
	const notification = "End of season sale!";
	const { fetch, data } = loadEvent;
	const title = "List of available products"
	const res = await fetch('http://localhost:4000/products')
	const products = await res.json()

	return {
		...data,
		Component: Product,
		notification
	}
}