import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import MobileNav from '../../components/Layout/MobileNav';

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const location = useLocation();

  const checkToken = () => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('profile');
        return false;
      } else return true;
    }
  };

  if (!checkToken())
    return <Navigate to="/auth" state={{ from: location }} replace />;
  return (
    <>
      <Outlet />
      <MobileNav />
    </>
  );
};

export default ProtectedRoutes;
