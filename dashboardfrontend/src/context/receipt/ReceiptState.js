import React, { useReducer } from "react";
import ReceiptContext from "./receiptContext";
import receiptReducer from "./receiptReducer";
import { SET_LOADING, ERROR_RECEIPTDATA, GET_RECEIPTDATA } from "../types";
import { url } from "../../utils/url";
import axios from "axios";

const ReceiptState = props => {
  const initialState = {
    receiptData: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(receiptReducer, initialState);

  // Get receipt Data

  const getReceiptData = async () => {
    try {
      const data = await axios.get(`${url}/api/v1/receipts`);
      dispatch({ type: GET_RECEIPTDATA, payload: data.data });
    } catch (error) {
      dispatch({ type: ERROR_RECEIPTDATA, payload: error });
    }
    setLoading();
  };

  // Set loading to false

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ReceiptContext.Provider
      value={{
        receiptData: state.receiptData,
        loading: state.loading,
        error: state.error,
        getReceiptData
      }}
    >
      {props.children}
    </ReceiptContext.Provider>
  );
};

export default ReceiptState;
