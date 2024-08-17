// app/api/latestData/route.js
import dbConnect from '../dbConnect';

export async function GET() {
  try {
    const client = await dbConnect();
    const result = await client.query(`
      SELECT * 
      FROM "NRD012"
      ORDER BY "date" DESC
      LIMIT 1
    `);
    return new Response(JSON.stringify(result.rows[0] || {}), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*','Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*','Content-Type': 'application/json' },
    });
  }
}
