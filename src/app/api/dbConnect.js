import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'itdev.cmtc.ac.th',
  database: 'postgres',
  password: 'postgres',
  port: 5052,
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
