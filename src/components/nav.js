"use client"; // This makes the component a Client Component

import Link from "next/link";
import Image from "next/image";
import Logo from '../../public/logo.png';
import styles from '../app/nav.module.css'; 

const updateLEDStatus = async (status) => {
  try {
    const response = await fetch('/api/getControlCommand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    console.log('Response Data:', data);  // เพิ่มการตรวจสอบข้อมูลที่ได้รับ
    if (data.success) {
      alert(`LED status updated to ${status}`);
    } else {
      alert('Failed to update LED status');
    }
  } catch (error) {
    console.error('Error updating LED status:', error);
    alert('Error updating LED status');
  }
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className={`navbar-brand ${styles.navbarBrand}`} href="./">
          <Image src={Logo} alt="Project Logo" width={60} height={60} className="d-inline-block align-text-top mr-1" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link active ${styles.navLink}`} aria-current="page" href="./">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} href="/History">History</Link>
            </li>
          </ul>
          <form className="d-flex">
            <button type="button" className="btn btn-outline-success me-md-2" onClick={() => updateLEDStatus('RGB_ON')}>Control RGB</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => updateLEDStatus('BUZZER_ON')}>Control Buzzer</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
