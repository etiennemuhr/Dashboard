import { SET_LOADING, GET_RECEIPTDATA, ERROR_RECEIPTDATA } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RECEIPTDATA:
      return {
        ...state,
        receiptData: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case ERROR_RECEIPTDATA:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
