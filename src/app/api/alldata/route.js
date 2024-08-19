import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database once
client.connect();

// src/app/api/route.js
// -------------------------------------------------------------------------------------
export async function GET() {
  try {
    const result = await client.query('SELECT * FROM "NRD012"');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('GET Error:', error.stack || error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    // Parse JSON from the request
    // const { LDR, VR, TEMP, DISTANCE } = await request.json();
    
    // // Ensure data types are correct
    // const ldr = parseInt(LDR, 10);
    // const vr = parseInt(VR, 10);
    // const temp = parseFloat(TEMP);
    // const distance = parseFloat(DISTANCE);

    // // Execute SQL query to insert data
    // const res = await client.query(
    //   'INSERT INTO "NRD012" (LDR, VR, TEMP, DISTANCE) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [ldr, vr, temp, distance]
    // );

    // // Return successful response
    // return new Response(JSON.stringify(res.rows[0]), {
    //   status: 201,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    // });
  } catch (error) {
    console.error('POST Error:', error.stack || error.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}
