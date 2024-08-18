import dbConnect from '../dbConnect';
import dotenv from 'dotenv';
import { Client } from 'pg';  // Import Client from pg

dotenv.config();

export default async function handler(req, res) {
    let client;
    try {
        // Connect to the database using dbConnect
        client = await dbConnect();

        // Query the latest command
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
    } finally {
        // Ensure the database connection is closed
        if (client) {
            await client.end();
        }
    }
}
