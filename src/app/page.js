"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [lastdata, setLastData] = useState([]);

  async function fetchlastData() {
    try {
      const res = await fetch("/api/lastestData");
      const data = await res.json();
      setLastData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const chartData1 = lastdata.length > 0 ? {
    labels: ['LDR', 'VR'],
    datasets: lastdata.map((dataPoint, index) => ({
      label: `Data Point ${index + 1}`,
      data: [dataPoint.ldr, dataPoint.vr],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    })),
  } : null;

  const chartData2 = lastdata.length > 0 ? {
    labels: ['Temperature', 'Distance'],
    datasets: lastdata.map((dataPoint, index) => ({
      label: `Data Point ${index + 1}`,
      data: [dataPoint.temp, dataPoint.distance],
      backgroundColor: [
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    })),
  } : null;

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

  useEffect(() => {
    fetchlastData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Latest Sensor Data</h1>

      <div className={styles.chartRow}>
        {lastdata.length > 0 && chartData1 ? (
          <div className={styles.chartContainer}>
            <h2>LDR and VR</h2>
            <Bar data={chartData1} options={chartOptions} />
          </div>
        ) : (
          <p>No data available for LDR and VR chart</p>
        )}

        {lastdata.length > 0 && chartData2 ? (
          <div className={styles.chartContainer}>
            <h2>Temperature and Distance</h2>
            <Bar data={chartData2} options={chartOptions} />
          </div>
        ) : (
          <p>No data available for Temperature and Distance chart</p>
        )}
      </div>

      <table className={`table table-striped table-bordered ${styles.table}`}>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>LDR</th>
            <th>VR</th>
            <th>Temperature</th>
            <th>Distance</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          {lastdata.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.ldr}</td>
              <td>{data.vr}</td>
              <td>{data.temp}</td>
              <td>{data.distance}</td>
              <td>
                {new Date(data.date).toLocaleString('th-TH', {
                  timeZone: 'Asia/Bangkok',
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
