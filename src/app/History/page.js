'use client';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/alldata');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>LDR</th>
            <th>VR</th>
            <th>Temperature</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ldr}</td>
              <td>{item.vr}</td>
              <td>{item.temp}</td>
              <td>{item.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
