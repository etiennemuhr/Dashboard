import React, { useEffect, useContext } from "react";
import { Paper, TextField, withStyles, Button } from "@material-ui/core";
import { withFormik } from "formik";
import axios from "axios";
import { useSnackbar } from "notistack";
import Particles from "react-particles-js";

import AuthContext from "../context/auth/authContext";

const VTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "blue"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "blue"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {},
      "&:hover fieldset": {
        borderColor: "blue"
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue"
      }
    }
  }
})(TextField);

const LoginPage = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  const authContext = useContext(AuthContext);

  const { isAuthenticated, login, loadUser } = authContext;

  useEffect(() => {
    if (errors.login === true) {
      login({ email: values.email, password: values.password });
    } else if (errors.login === "error") {
      enqueueSnackbar("E-Mail oder Passwort falsch", {
        variant: "error"
      });
    }
    if (isAuthenticated) {
      props.history.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.login, isAuthenticated]);

  if (localStorage.getItem("token")) {
    loadUser();
  }

  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        padding: "0",
        margin: "0",
        top: "0",
        left: "0",
        position: "absolute"
      }}
      className="background_Login"
    >
      <Paper
        style={{
          height: "420px",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          marginBottom: "50px",
          justifyContent: "center",
          borderRadius: "20px"
        }}
      >
        <h1 align="center" style={{ fontWeight: "bold", fontSize: "45px" }}>
          Willkommen
        </h1>
        <form onSubmit={handleSubmit}>
          <VTextField
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            variant="outlined"
            label="E-Mail"
            helperText={touched.email && errors.email}
            error={errors.email && touched.email && true}
            required
            className={
              touched.email && !errors.email ? "success__AddCustomer" : null
            }
            style={{ margin: "15px 50px", width: "400px" }}
          />
          <VTextField
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
            variant="outlined"
            label="Passwort"
            helperText={touched.password && errors.password}
            error={errors.password && touched.password && true}
            required
            className={
              touched.password && !errors.password
                ? "success__AddCustomer"
                : null
            }
            style={{ margin: "15px 50px", width: "400px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "15px 50px", width: "400px" }}
          >
            Anmelden
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    const submitHandler = async () => {
      try {
        const res = await axios.post(
          "https://www.dashboardapi.etiennemuhr.at/api/v1/auth/login",
          values
        );
        setErrors({ login: true });
      } catch (error) {
        setErrors({ login: "error" });
      }

      setSubmitting(false);
    };
    submitHandler();
  },
  displayName: "MyForm"
})(LoginPage);

export default MyEnhancedForm;
