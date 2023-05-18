export async function GET() {
	console.log("current-time Get handler invoked");
	return new Response(new Date().toLocaleTimeString());
};

export const prerender = true;
