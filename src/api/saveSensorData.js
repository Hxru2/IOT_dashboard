import dbConnect from './dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { LDR, VR, TEMP, DISTANCE } = req.body;

    try {
      const query = 'INSERT INTO NRD012 (LDR, VR, TEMP, DISTANCE) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [LDR, VR, TEMP, DISTANCE];
      const result = await dbConnect(query, values);

      res.status(201).json({ message: 'Data saved successfully', data: result.rows[0] });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
