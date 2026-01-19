import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContextAPI } from "../AuthProvider/AuthProvider";


const PrivateRoute = ({ children }) => {

    
  const { user, loading } = useContext(AuthContextAPI);
  const location = useLocation();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
