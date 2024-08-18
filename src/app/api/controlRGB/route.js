import dbConnect from '../dbConnect';

export async function POST(req) {
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
    return new Response(JSON.stringify({ message: 'RGB control command stored successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error storing RGB command:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
