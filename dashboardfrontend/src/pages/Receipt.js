import React, { useState } from "react";
import ReceiptComp from "../components/Receipt/Receipt2";
import ReceiptEditComp from "../components/Receipt/ReceiptEdit";
import axios from "axios";

const Receipt = props => {
  const [editMode, setEditMode] = useState(false);
  const [newData, setNewData] = useState(false);

  const changeMode = () => {
    setEditMode(!editMode);
    const getNewData = async () => {
      const newData = await axios.get(
        `https://www.dashboardapi.etiennemuhr.at/api/v1/receipts/${props.history.location.state.data._id}`
      );
      setNewData(newData.data.data);
    };
    getNewData();
  };

  return (
    <div>
      {editMode ? (
        <ReceiptEditComp
          history={newData ? newData : props.history.location.state.data}
          changeMode={changeMode}
        ></ReceiptEditComp>
      ) : (
        <ReceiptComp
          history={newData ? newData : props.history.location.state.data}
          changeMode={changeMode}
        />
      )}
    </div>
  );
};

export default Receipt;
