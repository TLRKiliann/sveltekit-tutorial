export const load = async (loadEvent) => {
	const { fetch, depends } = loadEvent;
	depends('stocks:actively-trading');
	const title = 'Stock per model/number';
	const response_A = await fetch('http://localhost:4000/stockA');
	const response_B = await fetch('http://localhost:4000/stockB');
	const response_C = await fetch('http://localhost:4000/stockC');
	return {
		title,
		stock_a: response_A.json(),
		stock_b: response_B.json(),
		stock_c: response_C.json()
	};
};

export const ssr = false;
export const csr = true;