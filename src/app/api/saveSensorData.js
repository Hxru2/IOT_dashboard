import dbConnect from './dbConnect';

export async function POST(request) {
  try {
    // รับข้อมูลจากคำขอ
    const { LDR, VR, TEMP, DISTANCE } = await request.json();

    // คำสั่ง SQL สำหรับการเพิ่มข้อมูลลงในฐานข้อมูล
    const query = 'INSERT INTO NRD012 (LDR, VR, TEMP, DISTANCE) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [LDR, VR, TEMP, DISTANCE];
    
    // เชื่อมต่อกับฐานข้อมูลและรันคำสั่ง
    const result = await dbConnect(query, values);

    // ส่งข้อมูลกลับไปยังผู้ใช้
    return new Response(JSON.stringify({ message: 'Data saved successfully', data: result.rows[0] }), {
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving data:', error);

    // ส่งข้อผิดพลาดกลับไปยังผู้ใช้
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}
