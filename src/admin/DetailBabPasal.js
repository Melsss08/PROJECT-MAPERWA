import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import '../css/cssAdmin/detailBabPasal.css';

const DetailBabPasal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [babDetail, setBabDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBabDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/babs/${id}`);
        setBabDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data bab:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchBabDetail();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!babDetail) return <div>Bab tidak ditemukan</div>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="edit-icon"><FaEdit /></div>

        <div className="title-section">
          <h3>{babDetail.judul}</h3>
          <h3>{babDetail.subJudul}</h3>
          <h2>{babDetail.ketentuan_umum}</h2>
          <h4>{babDetail.pasal}</h4>
        </div>

        <div className="content-box">
          <p>{babDetail.isi}</p>
          {babDetail.isiTambahan && <p>{babDetail.isiTambahan}</p>}
        </div>

        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Kembali</button>
        </div>
      </div>
    </div>
  );
};

export default DetailBabPasal;
