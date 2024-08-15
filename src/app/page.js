"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [sensorData, setSensorData] = useState({
    ldr: 0,
    vr: 0,
    temp: 0,
    distance: 0,
  });

  useEffect(() => {
    // ดึงข้อมูลเซ็นเซอร์จาก API ทุกครั้งที่หน้าโหลด
    fetch('/api/getSensorData')
      .then((response) => response.json())
      .then((data) => setSensorData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={styles.page}>
      <h1>Dashboard</h1>
      <div style={styles.container}>
        <div style={styles.dataItem}>LDR: {sensorData.ldr}</div>
        <div style={styles.dataItem}>VR: {sensorData.vr}</div>
        <div style={styles.dataItem}>Temperature: {sensorData.temp}°C</div>
        <div style={styles.dataItem}>Distance: {sensorData.distance} cm</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    height: '100vh',
  },
  container: {
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
  },
  dataItem: {
    margin: '10px 0',
    fontSize: '1.2em',
  },
};
