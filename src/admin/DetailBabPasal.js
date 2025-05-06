import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/detailBabPasal.css';

const DetailBabPasal = ({ bab, onBack }) => {
  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="edit-icon">
          <FaEdit />
        </div>

        <div className="title-section">
          <h3>{bab.judul}</h3>
          <h3>BAB I</h3>
          <h2>KETENTUAN UMUM</h2>
          <h4>Pasal I</h4>
        </div>

        <div className="content-box">
          <p>{bab.isi}</p>
        </div>

        <div className="button-container">
          <button className="back-button" onClick={onBack}>
            Kembali
          </button>
        </div>

        <div className="content-box">
          <p>
            1. Mahasiswa Institut Teknologi Bachruddin Jusuf Habibie adalah peserta didik yang terdaftar dan belajar serta melaksanakan tridarma perguruan tinggi pada Universitas Negeri Makassar.<br />
            2. Lembaga Kemahasiswaan Universitas Negeri Makassar adalah wahana pengembangan diri mahasiswa ke arah perluasan wawasan, peningkatan kecerdasan, dan integritas kepribadian untuk mencapai tujuan pendidikan tinggi.<br />
            3. Bidang kemahasiswaan adalah subsistem pendidikan tinggi yang mencakup proses perencanaan, pengorganisasian, pengaturan, pengelolaan, pembinaan, pengendalian, dan evaluasi kegiatan ekstrakurikuler.<br />
            4. Kegiatan ekstrakurikuler adalah kegiatan kemahasiswaan yang meliputi penalaran dan keilmuan, minat dan kegemaran, upaya perbaikan kesejahteraan, serta bakti sosial pada masyarakat.<br />
            5. Majelis Permusyawaratan Mahasiswa (Maperwa) tingkat universitas adalah organisasi kemahasiswaan yang merupakan perwakilan mahasiswa pada tingkat universitas, menampung dan menyalurkan aspirasi mahasiswa melalui penetapan Garis Besar Program Kerja (GBPK) yang dilaksanakan oleh Badan Eksekutif Mahasiswa (BEM) tingkat universitas dan disahkan oleh rektor.
          </p>
        </div>

        <div className="button-container">
          <Link to="/" className="back-button">Kembali</Link>
        </div>
      </div>
    </div>
  );
};

export default DetailBabPasal;
