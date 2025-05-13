import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import halaman admin dibawah:
import DetailBabPasal from './admin/DetailBabPasal';
import Register from './admin/register';
import Masuk from './admin/masuk';
import Adart from './admin/adart';
import KelolaAspirasi from './admin/kelolaAspirasi';
import Jadwal from './admin/jadwal';
import Kontak from './admin/kontak';
import LayoutAdmin from './components/layoutAdmin';
// import StrukturKepengurusan from './admin/strukturkepengurusan';

// import halaman user dibawah:
import LayoutUser from './components/user/layoutUser';
import Beranda from './user/beranda';
import Aspirasi from './user/aspirasi';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa layout admin */}
        <Route path="/register" element={<Register />} />
        <Route path="/masuk" element={<Masuk />} />

        {/* Halaman-halaman yang menggunakan layout admin */}
        <Route path="/" element={<LayoutAdmin><Adart /></LayoutAdmin>} />
        <Route path="/detail-bab/:id" element={<LayoutAdmin><DetailBabPasal /></LayoutAdmin>} />

        {/* <Route path="/struktur" element={<LayoutAdmin><Struktur /></LayoutAdmin>} /> */}
        <Route path="/kelolaAspirasi" element={<LayoutAdmin><KelolaAspirasi /></LayoutAdmin>} />
        <Route path="/jadwal" element={<LayoutAdmin><Jadwal /></LayoutAdmin>} />
        <Route path="/kontak" element={<LayoutAdmin><Kontak /></LayoutAdmin>} />
        {/* <Route path="/Struktur" element={<LayoutAdmin><StrukturKepengurusan/></LayoutAdmin>} /> */}

        {/* Halaman user dengan layout user */}
        <Route path="/user" element={<LayoutUser />}>
          <Route path="beranda" element={<Beranda />} />
          <Route path="aspirasi" element={<Aspirasi />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
