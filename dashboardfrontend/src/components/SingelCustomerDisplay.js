import React from "react";
import { Typography } from "@material-ui/core";

const SingelCustomerDisplay = ({ title, value, className }) => {
  return (
    <div className={`${className} gridTitleContent__Customer`}>
      <Typography variant="subtitle2" style={{ marginLeft: "20px" }}>
        {title}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </div>
  );
};

export default SingelCustomerDisplay;
