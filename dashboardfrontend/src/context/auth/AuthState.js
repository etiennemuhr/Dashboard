import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/auth/me");

      dispatch({ type: USER_LOADED, payload: res.data.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User

  const login = async formData => {
    try {
      const res = await axios.post(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/auth/login",
        formData
      );

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
