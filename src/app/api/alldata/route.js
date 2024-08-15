import { NextResponse } from 'next/server';
import { client } from '../dbConnect';

export async function GET() {
  try {
    const result = await client.query('SELECT * FROM public."NRD012"');
    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
}
