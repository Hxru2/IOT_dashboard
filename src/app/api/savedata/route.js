import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();


export async function POST(request) {
  try {
    const { LDR, VR, TEMP, DISTANCE } = await request.json();
    // Hash password
    const res = await client.query('INSERT INTO "NRD012" (LDR, VR, TEMP, DISTANCE) VALUES ($1, $2, $3, $4) RETURNING *', [LDR, VR, TEMP, DISTANCE]);
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}

