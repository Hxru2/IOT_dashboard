// app/dashboard/page.js
import React from 'react';
import styles from './Dashboard.module.css';

export default async function Dashboard() {
  let lastestData = null;

  try {
    const response = await fetch('/api/lastestData'); // Correct URL path
    if (!response.ok) {
      throw new Error("Failed to fetch latest data");
    }
    lastestData = await response.json();
  } catch (error) {
    console.error("Error fetching latest data:", error);
    lastestData = null;
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Latest Sensor Data</h1>
      {lastestData && Object.keys(lastestData).length > 0 ? (
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
              <td>{lastestData.id}</td>
              <td>{lastestData.ldr}</td>
              <td>{lastestData.vr}</td>
              <td>{lastestData.temperature}</td>
              <td>{lastestData.distance}</td>
              <td>{lastestData.createdAt}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
