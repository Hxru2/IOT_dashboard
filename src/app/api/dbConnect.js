import { Client } from 'pg';

let client;

async function dbConnect() {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL, // ใช้ ENV สำหรับ URL ของฐานข้อมูล
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
  }
  return client;
}

export default dbConnect;
