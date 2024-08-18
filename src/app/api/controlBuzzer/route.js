import dbConnect from '../dbConnect';
import dotenv from 'dotenv';
import { Client } from 'pg';  // Ensure Client is imported

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let client;
    try {
      // Connect to the database
      client = await dbConnect();

      // Insert the command into the database for the buzzer
      await client.query(`
        INSERT INTO "NRD012" ("command", "date")
        VALUES ($1, NOW())
      `, ['BUZZER_ON']);

      console.log("Buzzer control command stored in the database");

      // Return a success response
      res.status(200).json({ message: 'Buzzer control command received' });
    } catch (error) {
      console.error('Error in controlBuzzer route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Ensure the database client is closed
      if (client) {
        await client.end();
      }
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
