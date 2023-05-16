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