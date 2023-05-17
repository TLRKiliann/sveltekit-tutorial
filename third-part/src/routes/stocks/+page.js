export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const title = 'stock number';
	const response = await fetch('http://localhost:4000/stocks');
	const stocks = await response.json()
	return {
		title,
		stocks
	}
}