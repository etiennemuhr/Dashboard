import React, { useContext, useEffect } from "react";

import AuthContext from "../context/auth/authContext";

const Logout = props => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated } = authContext;

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isAuthenticated) {
    props.history.push("/");
  }

  return <div>Sie werden abgemeldet...</div>;
};

export default Logout;
