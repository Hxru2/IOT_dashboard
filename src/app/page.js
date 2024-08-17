// app/dashboard/page.js
import React from 'react';
import styles from './Dashboard.module.css';

export default async function Dashboard() {
  let latestData;

  try {
    const response = await fetch('https://iot-dashboard-sand-tau.vercel.app/api/latestData');
    if (!response.ok) {
      throw new Error("Failed to fetch latest data");
    }
    latestData = await response.json();
  } catch (error) {
    console.error("Error fetching latest data:", error);
    latestData = null;
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Latest Sensor Data</h1>
      {latestData ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>LDR</th>
              <th>VR</th>
              <th>Temperature</th>
              <th>Distance</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{latestData.id}</td>
              <td>{latestData.ldr}</td>
              <td>{latestData.vr}</td>
              <td>{latestData.temperature}</td>
              <td>{latestData.distance}</td>
              <td>{latestData.createdAt}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
