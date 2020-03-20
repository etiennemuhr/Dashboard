import React from "react";

const SingelTableRowNoInput = props => {
  const {
    pos,
    productNumber,
    type,
    amount,
    pricePerProduct,
    total
  } = props.product;

  return (
    <tr className="tableRow__Receipt">
      <td className="tdPos__Receipt">{pos}</td>
      <td className="tdProductNumberInput__Receipt">
        {productNumber ? productNumber : "-"}
      </td>
      <td className="tdType__Receipt">{type ? type : "-"}</td>
      <td className="tdAmountInput__Receipt">{amount ? amount : "-"}</td>
      <td className="tdPricePerProductInput__Receipt">
        {pricePerProduct ? `${pricePerProduct}€` : "-"}
      </td>
      <td>{`${total}€`}</td>
    </tr>
  );
};

export default SingelTableRowNoInput;
