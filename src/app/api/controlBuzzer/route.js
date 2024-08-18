import dbConnect from '../dbConnect';
import dotenv from 'dotenv';


dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      const client = await dbConnect();

      // Insert the command into the database for the buzzer
      await client.query(`
        INSERT INTO "NRD012" ("command", "date")
        VALUES ($1, NOW())
      `, ['BUZZER_ON']);

      console.log("Buzzer control command stored in the database");

      // Return a success response
      res.status(200).json({ message: 'Buzzer control command stored successfully' });
    } catch (error) {
      console.error("Error storing buzzer command:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
