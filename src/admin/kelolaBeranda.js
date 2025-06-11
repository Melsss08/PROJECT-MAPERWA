import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cssAdmin/kelolaBeranda.css";

const KelolaBeranda = () => {
  const [formData, setFormData] = useState({ visi: "", misi: "" });
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    // Ambil data beranda saat pertama kali halaman dibuka
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/kelolaBeranda");
      if (res.data) {
        setSubmittedData(res.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/kelolaBeranda", formData);
      alert("Berhasil disimpan!");
      fetchData(); // Ambil data terbaru setelah simpan
      setFormData({ visi: "", misi: "" }); // Kosongkan form
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
            onClick={() => {
              setFormData({
                visi: submittedData.visi,
                misi: submittedData.misi,
              });
              setSubmittedData(null);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default KelolaBeranda;
