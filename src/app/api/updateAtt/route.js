import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            await dbConnect();
            const client = new Client();
            await client.connect();

            const updateQuery = `
                UPDATE "NRD012"
                SET att = att + 1
                WHERE id = $1
            `;
            const values = [id];

            await client.query(updateQuery, values);
            await client.end();

            res.status(200).json({ message: 'att column updated successfully' });
        } catch (error) {
            console.error('Error updating att column:', error);
            res.status(500).json({ error: 'Failed to update att column' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
