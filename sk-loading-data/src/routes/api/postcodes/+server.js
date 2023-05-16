export async function GET() {
  const res = await fetch('http://localhost:4000/postcodes');
  const postcodes = await res.json();
  const appPostCodes = postcodes.map((postcode) => {
    return {
      building_name: postcode.building_name,
      line_1: postcode.line_1,
      line_2: postcode.line_2
    }
  });
  return new Response(JSON.stringify(appPostCodes), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
