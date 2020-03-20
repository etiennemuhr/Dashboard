import React from "react";

import { Icon, IconButton } from "@material-ui/core";

const SingelTableRow = props => {
  const { pos } = props.product;

  const { productNumber, type, amount, pricePerProduct, total } = props.product;
  const { updateHandler, deleteHandler } = props;

  return (
    <tr className="tableRow__Receipt">
      <td>{pos}</td>
      <td className="tdProductNumberInput__Receipt">
        <input
          type="text"
          name="productNumber"
          value={productNumber}
          onChange={e => updateHandler(e, pos)}
          className="productNumberInput__Receipt"
        />
      </td>
      <td>
        <input
          type="text"
          name="type"
          value={type}
          onChange={e => updateHandler(e, pos)}
        />
      </td>
      <td className="tdAmountInput__Receipt">
        <input
          className="amountInput__Receipt"
          type="text"
          name="amount"
          value={amount}
          onChange={e => updateHandler(e, pos)}
        />
      </td>
      <td className="tdPricePerProductInput__Receipt">
        <input
          className="pricePerProductInput__Receipt"
          type="text"
          name="pricePerProduct"
          value={pricePerProduct}
          onChange={e => updateHandler(e, pos)}
        />
      </td>
      <td>{`${total}€`}</td>
      <td>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => deleteHandler(pos)}
        >
          <Icon style={{ color: "red" }}>delete</Icon>
        </IconButton>
      </td>
    </tr>
  );
};

export default SingelTableRow;
