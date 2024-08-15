// dbConnect.js
import { Pool } from 'pg';

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function dbConnect(query, values) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result;
  } finally {
    client.release();
  }
}
