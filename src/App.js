import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './admin/register';
import Masuk from './admin/masuk';
import Adart from './admin/adart';
// import InputKepengurusan from './admin/InputKepengurusan';
// import Aspirasi from './admin/Aspirasi';
import Jadwal from './admin/jadwal';
import Kontak from './admin/kontak';
import LayoutAdmin from './components/layoutAdmin';
import StrukturKepengurusan from './admin/strukturkepengurusan';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa layout admin */}
        <Route path="/register" element={<Register />} />
        <Route path="/masuk" element={<Masuk />} />

        {/* Halaman-halaman yang menggunakan layout admin */}
        <Route path="/" element={<LayoutAdmin><Adart /></LayoutAdmin>} />
        <Route path="/jadwal" element={<LayoutAdmin><Jadwal /></LayoutAdmin>} />
        <Route path="/kontak" element={<LayoutAdmin><Kontak /></LayoutAdmin>} />
        <Route path="/Struktur" element={<LayoutAdmin><StrukturKepengurusan/></LayoutAdmin>} />
      </Routes>
    </Router>
  );
  
}

export default App;
