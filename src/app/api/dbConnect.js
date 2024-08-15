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

try {
  const result = await client.query(query, values);
  return result;
} catch (err) {
  console.error('Database query failed:', err);
  throw err;
} finally {
  client.release();
}
