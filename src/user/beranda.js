import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/cssUser/beranda.css";

const Beranda = () => {
  const [data, setData] = useState({ visi: "", misi: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/kelolaBeranda");
        setData({
          visi: res.data.visi,
          misi: res.data.misi.split("\n"), // Jika misi dalam bentuk teks dipisahkan newline
        });
      } catch (err) {
        console.error("Gagal mengambil data beranda:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="header-container">
      <h1 className="header-title">
        MAJELIS PERMUSYAWARATAN <br /> MAHASISWA
      </h1>
      <div className="logos">
        <img src="/mpm.png" alt="Logo MPM" className="mpm" />
        <img src="/LogoClean.png" alt="Logo ITH" className="ith" />
      </div>

      <div className="visi-misi-container">
        {/* Visi */}
        <div className="card visi">
          <div className="card-header">
            <h2>Visi</h2>
          </div>
          <hr />
          <p className="card-content">{data.visi}</p>
        </div>

        {/* Misi */}
        <div className="card misi">
          <div className="card-header">
            <h2>Misi</h2>
          </div>
          <hr />
          <ol className="card-content">
            {data.misi &&
              data.misi.map((item, index) => (
                <li key={index}>
                  {item.replace(/^\s*\d+\.?\s*/, "")} {/* Hapus angka & titik di awal */}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
