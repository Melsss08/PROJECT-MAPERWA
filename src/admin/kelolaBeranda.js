import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cssAdmin/kelolaBeranda.css";

const KelolaBeranda = () => {
  const [formData, setFormData] = useState({
    judul: "",
    visi: "",
    misi: "",
  });

  const [berandaData, setBerandaData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tambahan

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/kelolaBeranda");
        if (res.data && (res.data.visi || res.data.misi)) {
          setBerandaData(res.data);
          setIsSubmitted(true); // Kalau sudah ada data, langsung tampilkan
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/kelolaBeranda", formData);
      alert("Berhasil disimpan!");
      setBerandaData(formData);
      setIsSubmitted(true); // Sembunyikan form setelah submit
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <div className="container">
      <h2>Kelola Beranda</h2>

      {/* Tampilkan form jika belum disubmit */}
      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          {/* <div>
            <label>Judul:</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
            />
          </div> */}
          <div>
            <label>Visi:</label>
            <textarea
              name="visi"
              value={formData.visi}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label>Misi:</label>
            <textarea
              name="misi"
              value={formData.misi}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
          </div>
          <button type="submit">Simpan</button>
          <button type="batal">Batal</button>
        </form>
      )}

      {/* Tampilkan preview jika data sudah disubmit */}
      {isSubmitted && berandaData && (
        <div className="preview-beranda">
          <h3>{berandaData.judul}</h3>

          <div className="card">
            <h4>Visi</h4>
            <p>{berandaData.visi}</p>
          </div>

          <div className="card">
            <h4>Misi</h4>
            <ol>
              {berandaData.misi.split("\n").map((item, index) => (
                <li key={index}>{item.replace(/^\s*\d+\.?\s*/, "")}</li>
              ))}
            </ol>
          </div>

            <button
                className="edit-button"
                onClick={() => {
                    setFormData(berandaData); // Isi form dengan data lama
                    setIsSubmitted(false);     // Tampilkan form
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
