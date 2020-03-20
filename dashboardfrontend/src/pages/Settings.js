import React, { useEffect } from "react";
import {
  TextField,
  withStyles,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";

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

const AddCustomerSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "Bitte geben Sie mindestens 2 Zeichen ein")
    .required("Bitte geben Sie einen Unternehmensnamen ein"),
  email: Yup.string()
    .email("Bitte geben Sie eine gültige E-Mail ein")
    .required("Bitte geben Sie eine E-Mail ein"),
  phone: Yup.string()
    .min(11, "Bitte geben Sie mindestens 11 Zeichen ein")
    .required("Bitte geben Sie eine Telefonnummer ein"),
  website: Yup.string()
    .url("Bitte geben Sie eine gültige URL ein")
    .required("Bitte geben Sie eine Website URL ein"),
  street: Yup.string().required("Bitte gebene Sie eine Straße ein"),
  city: Yup.string().required("Bitte gebene Sie einen Ort ein"),
  zipCode: Yup.string().required("Bitte gebene Sie eine Postleitzahl ein"),
  country: Yup.string().required("Bitte gebene Sie ein Land ein"),
  ust: Yup.string().required(
    "Bitte geben Sie eine Umsatzsteuer ohne Prozentzeichen ein"
  )
});

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (errors === "done") {
      enqueueSnackbar("Einstellungen gespeichert", {
        variant: "success"
      });
    } else if (errors === "Something went wrong") {
      enqueueSnackbar("Error, bitte versuchen Sie es später erneut", {
        variant: "error"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await axios.get(
        "https://www.dashboardapi.etiennemuhr.at/api/v1/settings"
      );
      if (settings.data.data[0]) {
        props.setValues(settings.data.data[0]);
        props.setFieldValue("oldData", true);
      }
    };
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapper__AddCustomer">
      <Paper className="container__AddCustomer">
        <Typography variant="h4" className="header__AddCustomer">
          Einstellungen
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="formContainer__AddCustomer">
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company}
              name="company"
              variant="outlined"
              label="Unternehmensname"
              helperText={touched.company && errors.company}
              error={errors.company && touched.company && true}
              required
              className={
                touched.company && !errors.company
                  ? "success__AddCustomer"
                  : null
              }
            />
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
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              name="phone"
              variant="outlined"
              label="Telefonnummer"
              helperText={touched.phone && errors.phone}
              error={errors.phone && touched.phone && true}
              required
              className={
                touched.phone && !errors.phone ? "success__AddCustomer" : null
              }
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.website}
              name="website"
              variant="outlined"
              label="Website"
              helperText={touched.website && errors.website}
              error={errors.website && touched.website && true}
              required
              className={
                touched.website && !errors.website
                  ? "success__AddCustomer"
                  : null
              }
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.street}
              name="street"
              variant="outlined"
              label="Straße"
              helperText={touched.street && errors.street}
              error={errors.street && touched.street && true}
              required
              className={
                touched.street && !errors.street ? "success__AddCustomer" : null
              }
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              name="city"
              variant="outlined"
              label="Ort"
              helperText={touched.city && errors.city}
              error={errors.city && touched.city && true}
              required
              className={
                touched.city && !errors.city ? "success__AddCustomer" : null
              }
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zipCode}
              name="zipCode"
              variant="outlined"
              label="Postleitzahl"
              helperText={touched.zipCode && errors.zipCode}
              error={errors.zipCode && touched.zipCode && true}
              required
              className={
                touched.zipCode && !errors.zipCode
                  ? "success__AddCustomer"
                  : null
              }
            />
            <VTextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              name="country"
              variant="outlined"
              label="Land"
              helperText={touched.country && errors.country}
              error={errors.country && touched.country && true}
              required
              className={
                touched.country && !errors.country
                  ? "success__AddCustomer"
                  : null
              }
            />
            <VTextField
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ust}
              name="ust"
              variant="outlined"
              label="Umsatzsteuer"
              helperText={touched.ust && errors.ust}
              error={errors.ust && touched.ust && true}
              required
              className={
                touched.ust && !errors.ust ? "success__AddCustomer" : null
              }
            />
          </div>
          <div className="textarea__AddCustomer">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="submitButton__AddCustomer"
            >
              Speichern
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    company: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    ust: ""
  }),
  validationSchema: AddCustomerSchema,

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    const submitHandler = async () => {
      try {
        if (values.oldData) {
          await axios.put("https://www.dashboardapi.etiennemuhr.at/api/v1/settings", values);
        } else {
          await axios.post("https://www.dashboardapi.etiennemuhr.at/api/v1/settings", values);
        }
        setErrors("done");
      } catch (error) {
        setErrors("Something went wrong");
      }

      setSubmitting(false);
    };
    submitHandler();
  },
  displayName: "MyForm"
})(MyForm);

export default MyEnhancedForm;
