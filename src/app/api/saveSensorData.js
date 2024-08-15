import dbConnect from './dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { LDR, VR, TEMP, DISTANCE } = req.body;

    try {
      const query = 'INSERT INTO NRD012 (LDR, VR, TEMP, DISTANCE) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [LDR, VR, TEMP, DISTANCE];
      const result = await dbConnect(query, values);

      res.status(201).json({ message: 'Data saved successfully', data: result.rows[0] });
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
      return new Response(JSON.stringify({ error: error }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": "application/json" },
      });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
