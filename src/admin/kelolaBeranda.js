import React, { useState } from "react";
import axios from "axios";
import "../css/cssAdmin/kelolaBeranda.css";

const KelolaBeranda = () => {
  const [formData, setFormData] = useState({
    visi: "",
    misi: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/kelolaBeranda", formData);
      setSubmittedData(formData);
      alert("Berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="beranda-container">
      <h2>Kelola Beranda</h2>

      {!submittedData ? (
        <form className="form-beranda" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="visi">Visi:</label>
            <textarea
              id="visi"
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="misi">Misi:</label>
            <textarea
              id="misi"
              name="misi"
              value={formData.misi}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Simpan</button>
        </form>
      ) : (
        <div className="beranda-preview">
          <div className="card">
            <h4>Visi</h4>
            <p>{submittedData.visi}</p>
          </div>

          <div className="card">
            <h4>Misi</h4>
            <ol>
              {submittedData.misi.split("\n").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ol>
          </div>

          <button
            className="edit-btn"
            onClick={() => setSubmittedData(null)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default KelolaBeranda;
