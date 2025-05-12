import { NavLink } from 'react-router-dom';
import '../../css/cssUser/navbar.css';

const NavbarUser = () => (
  <nav className="navbar-user">
    <div className="navbar-left">
      <img src="/logo2.png" alt="Logo" className="navbar-logo" />
      <div className="navbar-title">
        <span className="navbar-title-top">MAPERWA</span>
      </div>
    </div>
    <div className="navbar-menu">
      <NavLink to="/user/beranda">Beranda</NavLink>
      <NavLink to="/user/aspirasi">Aspirasi</NavLink>
      <NavLink to="/user/tentang">Tentang</NavLink>
      <NavLink to="/user/pengumuman">Pengumuman</NavLink>
      <NavLink to="/user/kontak">Kontak</NavLink>
    </div>
  </nav>
);

export default NavbarUser;
