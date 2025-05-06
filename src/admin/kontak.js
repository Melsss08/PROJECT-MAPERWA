import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../css/kontak.css';

export default function Kontak() {
  return (
    <div className="kontak-container">
      <button className="edit-button">
          <i className="fas fa-pen">✏️ Edit</i>
        </button>
      <div className="kontak-box">
        <div className="kontak-item">
          <i className="fas fa-phone"></i>
          <span>📞 08XXXXXXXXXX</span>
        </div>
        <div className="kontak-item">
          <i className="fas fa-envelope"></i>
          <span>✉️ maperwalth@gmail.com</span>
        </div>
        <div className="kontak-item">
          <i className="fab fa-instagram"></i>
          <span>📸 Maperwa ITH</span>
        </div>
        <div className="kontak-item">
          <i className="fab fa-facebook-f"></i>
          <span>📘 Maperwa ITH</span>
        </div>
      </div>

      <div className="map-box">
        <iframe
          title="Lokasi"
          src="https://www.google.com/maps?q=Parepare&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
