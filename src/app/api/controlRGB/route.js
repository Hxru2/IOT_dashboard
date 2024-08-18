import dbConnect from '../dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      const client = await dbConnect();

      // Insert the command into the database for the RGB lights
      await client.query(`
        INSERT INTO "ControlCommands" ("command", "createdAt")
        VALUES ($1, NOW())
      `, ['RGB_ON']);

      console.log("RGB control command stored in the database");

      // Return a success response
      res.status(200).json({ message: 'RGB control command stored successfully' });
    } catch (error) {
      console.error("Error storing RGB command:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
