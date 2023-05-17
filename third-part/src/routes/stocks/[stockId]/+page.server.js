import { error } from '@sveltejs/kit'

export const load = async (serverLoadEvent) => {
	const { fetch, params } = serverLoadEvent;
	const title = 'title of stockId';
	const { stockId } = params;
	if (stockId > 3) {
		throw error(404, {
			message: "Something went wrong...",
			hint: "choose another stock."
		});
	};
	const response = await fetch(`http://localhost:4000/stocks/${stockId}`);
	const stock = await response.json();
	return {
		title,
		stock
	};
};