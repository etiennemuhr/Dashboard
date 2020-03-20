import React, { useState, useEffect, Fragment } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Paper,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { useSnackbar } from "notistack";

import SingelCustomerDisplay from "../components/SingelCustomerDisplay";
import { Redirect } from "react-router-dom";

import CustomerReceipt from "../components/Receipt/CustomerReceipt";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const UpdateForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSubmitting) {
      setOpen(false);
      enqueueSnackbar("Kundendaten gespeichert", {
        variant: "success"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    company,
    zipCode,
    city,
    country,
    street,
    phone,
    contactPerson,
    website,
    description,
    email,
    zipCodeDelivery,
    cityDelivery,
    streetDelivery,
    countryDelivery
  } = loading ? props.history.location.state.customer : user;

  useEffect(() => {
    if (values.newUser !== undefined) {
      setUser(values.newUser);
    }
  }, [values.newUser]);

  useEffect(() => {
    let res;
    const getUserFromDatabase = async () => {
      res = await axios.get(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/customers/${props.history.location.state.id}`
      );
      const enhancedUser = {
        ...res.data.data,
        id: props.history.location.state.id
      };
      setUser(enhancedUser);
      props.setValues(enhancedUser);
      setLoading(false);
    };
    getUserFromDatabase();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    const deleteUser = async () => {
      // const res =
      await axios.delete(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/customers/${props.history.location.state.id}`
      );
      // const enhancedUser = {
      //   ...res.data.data,
      //   id: props.history.location.state.id
      // };
      enqueueSnackbar("Kunden gelöscht", {
        variant: "success"
      });
      setRedirect(true);
    };
    deleteUser();
  };

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh"
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="wrapper__Customer">
          <div>
            <Paper style={{ height: "708px" }}>
              <List>
                <Typography variant="h6" className="header__Customer">
                  Übersicht {company}
                </Typography>
                <Divider />
                <div className="infoWrapper__Customer">
                  <div style={{ width: "100%" }}>
                    <ListItem>
                      <SingelCustomerDisplay
                        title="Ansprechperson"
                        value={contactPerson}
                        className="item1__Customer"
                      />
                    </ListItem>

                    <ListItem>
                      <SingelCustomerDisplay
                        title="E-Mail"
                        value={email}
                        className="item2__Customer"
                      />
                    </ListItem>

                    <ListItem>
                      <SingelCustomerDisplay
                        title="Telefon"
                        value={phone}
                        className="item1__Customer"
                      />
                    </ListItem>

                    <ListItem>
                      <SingelCustomerDisplay
                        title="Website"
                        value={website}
                        className="item2__Customer"
                      />
                    </ListItem>
                    <div className="item1__Customer gridTitleContent__Customer">
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: "20px" }}
                      >
                        Rechnungsadresse
                      </Typography>
                      <Typography variant="body2">
                        {street} <br />
                        {`${zipCode} ${city}`}
                        <br />
                        {country}
                      </Typography>
                    </div>
                    <div className="item2__Customer gridTitleContent__Customer">
                      <Typography
                        variant="subtitle2"
                        style={{ marginLeft: "20px" }}
                      >
                        Lieferadresse
                      </Typography>
                      <Typography variant="body2">
                        {streetDelivery ? streetDelivery : ""} <br />
                        {zipCodeDelivery ? zipCodeDelivery : ""}
                        {cityDelivery ? ` ${cityDelivery}` : ""}
                        <br />
                        {countryDelivery ? countryDelivery : ""}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="descriptionWrapper__Customer">
                  <Typography variant="h6" className="header__Customer">
                    Beschreibung
                  </Typography>
                  <div className="description__Customer">
                    <Typography variant="body2" style={{ textAlign: "center" }}>
                      {description}
                    </Typography>
                  </div>
                </div>
                <div className="buttonContainer_Customer">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={handleClickOpen}
                  >
                    Bearbeiten
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      color: red[500],
                      borderColor: red[500],
                      marginLeft: "5px"
                    }}
                    startIcon={<Delete />}
                    onClick={handleDelete}
                  >
                    Löschen
                  </Button>
                </div>
              </List>
            </Paper>
          </div>
          <div>
            <CustomerReceipt customer={props.history.location.state.id} />
          </div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {company} bearbeiten
            </DialogTitle>
            <DialogContent>
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
                      touched.email && !errors.email
                        ? "success__AddCustomer"
                        : null
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
                    error={
                      errors.contactPerson && touched.contactPerson && true
                    }
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
                      touched.phone && !errors.phone
                        ? "success__AddCustomer"
                        : null
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
                          value={values.zipCode}
                          name="zipCode"
                          variant="outlined"
                          label="PLZ"
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
                        helperText={
                          touched.streetDelivery && errors.streetDelivery
                        }
                        error={
                          errors.streetDelivery &&
                          touched.streetDelivery &&
                          true
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
                          value={values.zipCodeDelivery}
                          name="zipCodeDelivery"
                          variant="outlined"
                          label="PLZ"
                          helperText={
                            touched.zipCodeDelivery && errors.zipCodeDelivery
                          }
                          error={
                            errors.zipCodeDelivery &&
                            touched.zipCodeDelivery &&
                            true
                          }
                          className={
                            touched.zipCodeDelivery && !errors.zipCodeDelevery
                              ? "success__AddCustomer"
                              : null
                          }
                        />
                        <VTextField
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cityDelivery}
                          name="cityDelivery"
                          variant="outlined"
                          label="Ort"
                          helperText={
                            touched.cityDelivery && errors.cityDelivery
                          }
                          error={
                            errors.cityDelivery && touched.cityDelivery && true
                          }
                          className={
                            touched.cityDelivery && !errors.cityDelivery
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
                        helperText={
                          touched.countryDelivery && errors.countryDelivery
                        }
                        error={
                          errors.countryDelivery &&
                          touched.countryDelivery &&
                          true
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
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "red" }}>
                Abbrechen
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{ color: "green" }}
              >
                Speichern
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {redirect && <Redirect to="/customers"></Redirect>}
    </Fragment>
  );
};

const MyEnhancedForm2 = withFormik({
  mapPropsToValues: () => ({ newUser: "" }),
  validationSchema: AddCustomerSchema,

  handleSubmit: (values, { setValues, setFieldValue, setSubmitting }) => {
    let save;
    delete values.newUser;
    const submitHandler = async () => {
      save = await axios.put(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/customers/${values._id}`,
        values
      );
      setValues(save.data.data);
      setFieldValue("newUser", save.data.data);
      setSubmitting(false);
    };
    submitHandler();
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  }
})(UpdateForm);
export default MyEnhancedForm2;
