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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    subJudul: '',
    pasal: '',
    isi: '',
  });

  useEffect(() => {
    const fetchBabDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/babs/${id}`);
        setBabDetail(response.data);
        setFormData(response.data);
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/babs/${id}`, formData);
      setBabDetail(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!babDetail) return <div>Bab tidak ditemukan</div>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <div className="edit-icon" onClick={handleEditToggle}>
          <FaEdit />
        </div>

        <div className="title-section">
          {isEditing ? (
            <>
              <input name="judul" value={formData.judul} onChange={handleInputChange} />
              <input name="subJudul" value={formData.subJudul} onChange={handleInputChange} />
              <input name="pasal" value={formData.pasal} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <h3>{babDetail.judul}</h3>
              <h3>{babDetail.subJudul}</h3>
              <h4>{babDetail.pasal}</h4>
            </>
          )}
        </div>

        <div className="content-box">
          {isEditing ? (
            <>
              <textarea name="isi" value={formData.isi} onChange={handleInputChange} />
            </>
          ) : (
            <>
              <p>{babDetail.isi}</p>
            </>
          )}
        </div>

        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}>Kembali</button>
          {isEditing && <button className="save-button" onClick={handleSave}>Simpan</button>}
        </div>
      </div>
    </div>
  );
};

export default DetailBabPasal;
