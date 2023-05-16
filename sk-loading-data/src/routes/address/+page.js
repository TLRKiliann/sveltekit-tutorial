export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const response = await fetch('/api/postcodes');
	const postcodes = await response.json();
	const addressList = postcodes.map((postcode) => {
		return `${postcode.building_name},
			${postcode.line_1},
			${postcode.line_2}`
	})
	return { addressList }
}
