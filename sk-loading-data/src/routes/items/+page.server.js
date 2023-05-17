export const load = async (serverLoadEvent) => {
	console.log("Load function called in page.server.js");
	const { fetch } = serverLoadEvent;
	const title = "List of available items"
	const res = await fetch('http://localhost:4000/items')
	const items = await res.json()
	return {
		title,
		items
	}
}