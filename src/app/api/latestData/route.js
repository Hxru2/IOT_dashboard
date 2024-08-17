// app/api/latestData/route.js
import dbConnect from '../dbConnect';

export async function GET(request) {
  try {
    // Connect to the database
    const client = await dbConnect();
    
    // Query to get the latest record ordered by 'date'
    const result = await client.query(`
      SELECT * 
      FROM "NRD012"
      ORDER BY "date" DESC
      LIMIT 1
    `);

    // Return the latest record in the response
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error fetching latest data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}
