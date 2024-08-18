// app/api/latestData/route.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    // Connect to the database
    await client.connect();

    // Query to get the latest data
    const result = await client.query(`
      SELECT * 
      FROM "NRD012"
      ORDER BY "date" DESC
      LIMIT 1
    `);

    return new Response(JSON.stringify(result.rows[0] || {}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching latest data:', error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } finally {
    // Ensure the database client is closed
    await client.end();
  }
}
