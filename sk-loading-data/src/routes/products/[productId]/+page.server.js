import {error} from '@sveltejs/kit'

export const load = async (serverLoadEvent) => {
	console.log("Load function called in page.server.js");
	const { fetch, params } = serverLoadEvent;
	//console.log({ params, url, route: route.id });
	const { productId } = params;
	if (productId > 3) {
		throw error(404,{
			message: 'Product not found',
			hint: 'try a different product'
		});
	}
	const title = "Product details second title";
	const notification = "End of season sale! 50% off";
	const res = await fetch(`http://localhost:4000/products/${productId}`);
	const product = await res.json();
	return {
		title,
		product,
		notification
	};
};
