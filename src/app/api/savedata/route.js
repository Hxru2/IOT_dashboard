import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();


export async function POST(request) {
  try {
    const { analog1, analog2, digital1, digital2 } = await request.json();
    // Hash password
    const res = await client.query('INSERT INTO "ATH034" (analog1, analog2, digital1, digital2) VALUES ($1, $2, $3, $4) RETURNING *', [analog1, analog2, digital1, digital2]);
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

