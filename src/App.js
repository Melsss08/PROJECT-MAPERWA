import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './admin/register';
import Masuk from './admin/masuk';
import Adart from './admin/adart';
// import Struktur from './admin/Struktur';
// import Aspirasi from './admin/Aspirasi';
// import Jadwal from './admin/Jadwal';
// import Kontak from './admin/Kontak';
import LayoutAdmin from './components/layoutAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa layout admin */}
        <Route path="/register" element={<Register />} />
        <Route path="/masuk" element={<Masuk />} />

        {/* Halaman-halaman yang menggunakan layout admin */}
        <Route path="/" element={<LayoutAdmin><Adart /></LayoutAdmin>} />
        {/* <Route path="/struktur" element={<LayoutAdmin><Struktur /></LayoutAdmin>} />
        <Route path="/aspirasi" element={<LayoutAdmin><Aspirasi /></LayoutAdmin>} />
        <Route path="/jadwal" element={<LayoutAdmin><Jadwal /></LayoutAdmin>} />
        <Route path="/kontak" element={<LayoutAdmin><Kontak /></LayoutAdmin>} /> */}
      </Routes>
    </Router>
  );
  
}

export default App;
