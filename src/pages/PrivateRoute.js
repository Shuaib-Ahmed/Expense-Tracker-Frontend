import React, { Suspense } from "react";
import { Loading } from ".";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Suspense fallback={<Loading />}>{children}</Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
