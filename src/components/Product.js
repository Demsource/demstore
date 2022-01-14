import React, { useState } from "react";

function Product({ data, handleCheck }) {
  let productId = "";
  let infos = [];

  const [checked, setChecked] = useState(false);

  if (Object.getPrototypeOf(data) === Object.prototype && data.sku) {
    productId = data.sku;

    let infoIndex = 0;
    let height;
    let width;
    let length;

    for (var key in data) {
      if (key !== "id" && key !== "skuId" && data[key]) {
        infoIndex++;

        key === "height"
          ? (height = data[key])
          : key === "width"
          ? (width = data[key])
          : key === "length"
          ? (length = data[key])
          : infos.push(
              <li key={infoIndex}>
                {key === "size" ? "Size: " : key === "weight" ? "Weight: " : ""}
                {data[key]}{" "}
                {key === "price"
                  ? "$"
                  : key === "size"
                  ? "MB"
                  : key === "weight"
                  ? "KG"
                  : ""}
              </li>
            );
      }
    }

    height &&
      width &&
      length &&
      infos.push(
        <li key={productId + "_dimensions"}>
          Dimensions: {height}x{width}x{length}
        </li>
      );
  }

  return (
    <>
      {infos.length ? (
        <div className="product">
          <ul>{infos}</ul>
          <input
            type="checkbox"
            className="delete-checkbox"
            defaultChecked={checked}
            onChange={(e) => {
              setChecked(!checked);
              handleCheck(!checked, productId);
            }}
          />
        </div>
      ) : (
        <div>No Product To Display</div>
      )}
    </>
  );
}

export default Product;
