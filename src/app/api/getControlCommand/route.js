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
        const result = await client.query(`
            SELECT command
            FROM "NRD012"
            ORDER BY "id" DESC
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            return new Response(JSON.stringify(result.rows[0]), {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Cache-Control': "no-cache, no-store, max-age=0, must-revalidate",
                },
            });
        } else {
            return new Response(JSON.stringify({ message: "No commands found" }, {
                status: 200,
                headers: {  
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Cache-Control': "no-cache, no-store, max-age=0, must-revalidate",
                },
            }));
        }
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