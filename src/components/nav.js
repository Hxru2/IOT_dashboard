"use client"; // This makes the component a Client Component

import Link from "next/link";
import Image from "next/image";
import Logo from '../../public/logo.png';
import styles from '../app/nav.module.css'; 

export default function Nav() {
  const controlRGB = async () => {
    try {
      const response = await fetch('/api/controlRGB', {
        method: 'POST',
      });
      if (response.ok) {
        console.log("RGB controlled successfully");
      } else {
        console.log("Failed to control RGB");
      }
    } catch (error) {
      console.error("Error controlling RGB:", error);
    }
  };

  const controlBuzzer = async () => {
    try {
      const response = await fetch('/api/controlBuzzer', {
        method: 'POST',
      });
      if (response.ok) {
        console.log("Buzzer controlled successfully");
      } else {
        console.log("Failed to control Buzzer");
      }
    } catch (error) {
      console.error("Error controlling Buzzer:", error);
    }
  };

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
            <button type="button" className="btn btn-outline-success me-md-2" onClick={controlRGB}>Control RGB</button>
            <button type="button" className="btn btn-outline-primary" onClick={controlBuzzer}>Control Buzzer</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
