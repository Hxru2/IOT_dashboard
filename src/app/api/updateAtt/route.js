// src/app/api/updateAtt/route.js
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(request) {
  try {
    // Get the current value of the att column
    const currentValueRes = await client.query(
      'SELECT att FROM "NRD012" WHERE id = $1',
      [87] // ID of the row you want to update
    );

    if (currentValueRes.rowCount === 0) {
      throw new Error('No records found');
    }

    const currentValue = currentValueRes.rows[0].att;

    // Increment the att value by 1
    const updatedValue = currentValue + 1;

    // Update the att column with the new value
    const updateRes = await client.query(
      'UPDATE "NRD012" SET att = $1 WHERE id = $2 RETURNING *',
      [updatedValue, 87] // Update the record with id = 87
    );

    if (updateRes.rowCount === 0) {
      throw new Error('No rows updated');
    }

    return new Response(JSON.stringify({ success: true, updatedValue }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log the error to a log file
    const logPath = path.join(process.cwd(), 'log.txt');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${error.message}\n`);

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
