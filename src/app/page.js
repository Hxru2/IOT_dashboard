// app/dashboard/page.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default async function Dashboard() {
  let latestData = null;

  try {
    const response = await fetch('/api/lastestData'); // Correct URL path
    if (!response.ok) {
      throw new Error("Failed to fetch latest data");
    }
    latestData = await response.json();
  } catch (error) {
    console.error("Error fetching latest data:", error);
    latestData = null;
  }

  // Bar Chart Data and Options
  const chartData = latestData
    ? {
        labels: ['LDR', 'VR', 'Temperature', 'Distance'],
        datasets: [
          {
            label: 'Sensor Values',
            data: [latestData.ldr, latestData.vr, latestData.temperature, latestData.distance],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Latest Sensor Data Visualization',
      },
    },
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Latest Sensor Data</h1>

      {/* Bar Chart */}
      {latestData && chartData ? (
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No data available for the chart</p>
      )}

      {/* Data Table */}
      {latestData && Object.keys(latestData).length > 0 ? (
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
        <p>No data available for the table</p>
      )}
    </div>
  );
}
