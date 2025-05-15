import React from 'react';
import NavbarUser from '../user/navbarUser';
import { Outlet } from 'react-router-dom';

const LayoutUser = () => {
  return (
    <>
      <NavbarUser />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutUser;
