export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const title = "features products";
	const response = await fetch('http://localhost:4000/featured-products');
	const featuredProducts = await response.json();
	return {
		title,
		featuredProducts
	}
}