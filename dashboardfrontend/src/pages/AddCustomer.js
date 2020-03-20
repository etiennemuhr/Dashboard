import React, { useState, useEffect } from "react";
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
import { Redirect } from "react-router-dom";

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
  contactPerson: Yup.string()
    .min(2, "Bitte geben Sie mindestens 2 Zeichen ein")
    .required("Bitte geben Sie eine Kontaktperson ein"),
  phone: Yup.string()
    .min(11, "Bitte geben Sie mindestens 11 Zeichen ein")
    .required("Bitte geben Sie eine Telefonnummer ein"),
  website: Yup.string()
    .url("Bitte geben Sie eine gültige URL ein")
    .required("Bitte geben Sie eine Website URL ein"),
  revenue: Yup.string().required("Bitte geben Sie eine Zahl ein"),
  street: Yup.string().required("Bitte gebene Sie eine Straße ein"),
  city: Yup.string().required("Bitte gebene Sie einen Ort ein"),
  zipCode: Yup.string().required("Bitte gebene Sie eine Postleitzahl ein"),
  country: Yup.string().required("Bitte gebene Sie ein Land ein")
});

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  const [redirect, setRedirect] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errors === "Done") {
      enqueueSnackbar("Kunden erstellt", {
        variant: "success"
      });
      setRedirect(true);
    } else {
    }

    if (errors === "Something went wrong") {
      enqueueSnackbar("Error, bitte versuchen Sie es Später erneut", {
        variant: "error"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  return (
    <div className="wrapper__AddCustomer">
      <Paper className="container__AddCustomer">
        <Typography variant="h4" className="header__AddCustomer">
          Kunden hinzufügen
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
              label="Unternehmen"
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
              value={values.contactPerson}
              name="contactPerson"
              variant="outlined"
              label="Ansprechpartner"
              helperText={touched.contactPerson && errors.contactPerson}
              error={errors.contactPerson && touched.contactPerson && true}
              required
              className={
                touched.contactPerson && !errors.contactPerson
                  ? "success__AddCustomer"
                  : null
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
              value={values.revenue}
              name="revenue"
              variant="outlined"
              label="Bisheriger Umsatz"
              helperText={touched.revenue && errors.revenue}
              error={errors.revenue && touched.revenue && true}
              required
              className={
                touched.revenue && !errors.revenue
                  ? "success__AddCustomer"
                  : null
              }
            />
            <div>
              <Typography variant="h6">Rechnungsadresse</Typography>
              <div className="smallGird__AddCustomer">
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
                    touched.street && !errors.street
                      ? "success__AddCustomer"
                      : null
                  }
                />
                <div className="cityZipCode__AddCustomer">
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
                      touched.city && !errors.city
                        ? "success__AddCustomer"
                        : null
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
                </div>
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
              </div>
            </div>
            <div>
              <Typography variant="h6">Lieferadresse</Typography>
              <div className="smallGird__AddCustomer">
                <VTextField
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.streetDelivery}
                  name="streetDelivery"
                  variant="outlined"
                  label="Straße"
                  helperText={touched.streetDelivery && errors.streetDelivery}
                  error={
                    errors.streetDelivery && touched.streetDelivery && true
                  }
                  className={
                    touched.streetDelivery && !errors.streetDelivery
                      ? "success__AddCustomer"
                      : null
                  }
                />
                <div className="cityZipCode__AddCustomer">
                  <VTextField
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cityDelivery}
                    name="cityDelivery"
                    variant="outlined"
                    label="Ort"
                    helperText={touched.cityDelivery && errors.cityDelivery}
                    error={errors.cityDelivery && touched.cityDelivery && true}
                    className={
                      touched.cityDelivery && !errors.cityDelivery
                        ? "success__AddCustomer"
                        : null
                    }
                  />
                  <VTextField
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipCodeDelivery}
                    name="zipCodeDelivery"
                    variant="outlined"
                    label="Postleitzahl"
                    helperText={
                      touched.zipCodeDelivery && errors.zipCodeDelivery
                    }
                    error={
                      errors.zipCodeDelivery && touched.zipCodeDelivery && true
                    }
                    className={
                      touched.zipCodeDelivery && !errors.zipCodeDelevery
                        ? "success__AddCustomer"
                        : null
                    }
                  />
                </div>
                <VTextField
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.countryDelivery}
                  name="countryDelivery"
                  variant="outlined"
                  label="Land"
                  helperText={touched.countryDelivery && errors.countryDelivery}
                  error={
                    errors.countryDelivery && touched.countryDelivery && true
                  }
                  className={
                    touched.countryDelivery && !errors.countryDelivery
                      ? "success__AddCustomer"
                      : null
                  }
                />
              </div>
            </div>
          </div>
          <div className="textarea__AddCustomer">
            <Typography variant="h6">Beschreibung</Typography>
            <div>
              <VTextField
                style={{ width: "100%" }}
                type="text"
                multiline
                rows="4"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
                variant="outlined"
                label="Beschreibung"
                helperText={touched.description && errors.description}
                error={errors.description && touched.description && true}
                className={
                  touched.description && !errors.description
                    ? "success__AddCustomer"
                    : null
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="submitButton__AddCustomer"
            >
              Kunden hinzufügen
            </Button>
          </div>
        </form>
      </Paper>
      {redirect && <Redirect to="/customers"></Redirect>}
    </div>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    company: "",
    email: "",
    contactPerson: "",
    phone: "",
    website: "",
    revenue: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    streetDelivery: "",
    cityDelivery: "",
    zipCodeDelevery: "",
    countryDelivery: "",
    description: ""
  }),
  validationSchema: AddCustomerSchema,

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    values.linkTo = values.company;
    const submitHandler = async () => {
      try {
        await axios.post("https://www.dashboardapi.etiennemuhr.at/api/v1/customers", values);
        setErrors("Done");
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
