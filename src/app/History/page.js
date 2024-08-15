'use client';
import Link from 'next/link'

import { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://localhost:3000/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
 
  getUsers()
  const interval  = setInterval(getUsers, 1000);
  return () => clearInterval(interval );
}, []);

  return (
    <>

    <br /><br /><br /><br />
    <div className="container">
      <div class="card">
  <div class="card-header">
    Users List
  </div>
  <div class="card-body">
  <div className="row">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='col-md-2 text-center'>ID</th>
            <th className='col-md-2'>LDR</th>
            <th className='col-md-2'>VR</th>
            <th className='col-md-2'>Temperature</th>
            <th className='col-md-2'>Distance</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='text-center'>{item.ID}</td>
              <td>{item.LDR}</td>
              <td>{item.VR}</td>
              <td>{item.TEMP}</td>
              <td>{item.DISTANCE}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </div>
    </div>
    <br /><br />

    </>
  );
}