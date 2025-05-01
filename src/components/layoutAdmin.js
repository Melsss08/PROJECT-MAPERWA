import React from 'react';
import SidebarAdmin from './sidebarAdmin';
import HeaderAdmin from './headerAdmin';

const layoutAdmin = ({ children }) => {
  return (
    <>
      <HeaderAdmin />
      <SidebarAdmin>{children}</SidebarAdmin>
    </>
  );
};

export default layoutAdmin;
