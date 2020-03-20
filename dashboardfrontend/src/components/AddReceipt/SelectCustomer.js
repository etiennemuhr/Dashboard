import React, { useEffect, useState } from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const SelectCustomer = props => {
  const [receipt, setReceipt] = useState();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();
  useEffect(() => {
    let res;
    const fetchCustomer = async () => {
      res = await axios.get("https://www.dashboardapi.etiennemuhr.at/api/v1/customers");

      setReceipt(res.data.data);
      setLoading(false);
    };
    fetchCustomer();
  }, []);

  if (!value) {
    props.validInputHandler(false);
  } else {
    props.validInputHandler(true);
  }
  return (
    <div style={{ margin: "15px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Autocomplete
          id="combo-box-demo"
          options={receipt}
          value={value}
          onChange={(event, newValue) => {
            props.chosenCustomerHandler(newValue);
            setValue(newValue);
          }}
          getOptionLabel={option => option.company}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Kunden suchen"
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
    </div>
  );
};

export default SelectCustomer;
