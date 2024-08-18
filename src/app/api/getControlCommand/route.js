// pages/api/getControlCommand.js
import dbConnect from '../dbConnect';
import dotenv from 'dotenv';


dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export default async function handler(req, res) {
    try {
        const client = await dbConnect();
        const result = await client.query(`
            SELECT "command"
            FROM "NRD012"
            ORDER BY "timestamp" DESC
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No commands found' });
        }
    } catch (error) {
        console.error("Error fetching control command:", error);
        res.status(500).json({ error: 'Failed to fetch control command' });
    }
}
