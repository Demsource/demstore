import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const axios = require("axios");

function AddProduct() {
  let navigate = useNavigate();

  const [skuField, setSkuField] = useState("");
  const [nameField, setNameField] = useState("");
  const [priceField, setPriceField] = useState("");

  const [productTypeField, setProductTypeField] = useState("");

  const [sizeField, setSizeField] = useState("");
  const [weightField, setWeightField] = useState("");
  const [heightField, setHeightField] = useState("");
  const [widthField, setWidthField] = useState("");
  const [lengthField, setLengthField] = useState("");

  const validateTextFields = (validationObject) => {
    const textFields = Object.entries(validationObject);

    textFields.forEach((field) => {
      let property = field[0].replace("Field", "");
      let value = field[1];
      let allowed =
        property === "sku"
          ? /^(?!^-)(?!^_)(?!.*--)(?!.*__)[\w-]+$/.test(value)
          : /^(?!^-)(?!^_)(?!.*--)(?!.*__)(?!.* {2,})[\w -]+$/.test(value);

      let fieldElement = document.querySelector(`label[for=${property}]`);

      if (
        value &&
        !allowed &&
        fieldElement &&
        !document.getElementById(`${property}_note`)
      ) {
        let note = document.createElement("div");
        let span = document.createElement("span");
        let strong = document.createElement("strong");

        note.appendChild(span);
        note.appendChild(strong);

        note.id = `${property}_note`;
        note.className = "note";

        span.innerText = "Note: ";
        strong.innerText = `Please, provide the data of indicated type`;

        fieldElement.insertAdjacentElement("afterend", note);
      }
    });
  };

  const handleChange = (e) => {
    e.target.value && document.getElementById(`${e.target.id}-note`)?.remove();
    e.target.value && document.getElementById(`${e.target.id}_note`)?.remove();

    switch (e.target.id) {
      case "sku":
        validateTextFields({ skuField });
        setSkuField(e.target.value);
        break;
      case "name":
        validateTextFields({ nameField });
        setNameField(e.target.value);
        break;
      case "price":
        setPriceField(e.target.value);
        break;
      case "productType":
        setProductTypeField(e.target.value);
        setSizeField("");
        setWeightField("");
        setHeightField("");
        setWidthField("");
        setLengthField("");

        let notes = document.getElementsByClassName("note");

        if (notes?.length) {
          for (let i = notes.length - 1; i >= 0; i--) {
            "size weight height width length".includes(
              notes[i]?.id?.slice(0, notes[i].id.indexOf("-"))
            ) && notes[i].remove();
          }
        }
        break;
      case "size":
        setSizeField(e.target.value);
        break;
      case "weight":
        setWeightField(e.target.value);
        break;
      case "height":
        setHeightField(e.target.value);
        break;
      case "width":
        setWidthField(e.target.value);
        break;
      case "length":
        setLengthField(e.target.value);
        break;

      default:
        break;
    }
  };

  const handeSave = () => {
    let checkFields = [
      { skuField },
      { nameField },
      { priceField },
      { productTypeField },
      { sizeField },
      { weightField },
      { heightField },
      { widthField },
      { lengthField },
    ];

    checkFields.forEach((field) => {
      let fieldFirstOnlyKey = Object.keys(field)[0];
      let fieldName = fieldFirstOnlyKey.replace("Field", "");

      if (!field[fieldFirstOnlyKey]) {
        if (
          document.querySelector(`label[for=${fieldName}]`) &&
          !document.getElementById(`${fieldName}-note`)
        ) {
          let note = document.createElement("div");
          let span = document.createElement("span");
          let strong = document.createElement("strong");

          note.appendChild(span);
          note.appendChild(strong);

          note.id = `${fieldName}-note`;
          note.className = "note";

          span.innerText = "Note: ";
          strong.innerText = `Please ${
            fieldName === "productType"
              ? "choose product type"
              : "fill in " + fieldName + " field"
          }`;

          document
            .querySelector(`label[for=${fieldName}]`)
            .insertAdjacentElement("afterend", note);
        }
      }
    });

    validateTextFields({ skuField, nameField });

    let submitFields = checkFields.filter((field, i) => {
      let fieldFirstOnlyKey = Object.keys(field)[0];
      let fieldName = fieldFirstOnlyKey.replace("Field", "");

      return i < 4
        ? true
        : productTypeField === "dvd_attributes" && fieldName === "size"
        ? true
        : productTypeField === "book_attributes" && fieldName === "weight"
        ? true
        : productTypeField === "furniture_attributes" &&
          "height width length".includes(fieldName)
        ? true
        : false;
    });

    if (
      submitFields.length > 4 &&
      submitFields.every((field) => field[Object.keys(field)[0]])
    ) {
      let data = {};
      submitFields.forEach((field) => {
        let name = Object.keys(field)[0];
        let value = field[name];

        data = { ...data, [name]: value };
      });

      axios
        .post(
          "https://api-juniortest-demi.000webhostapp.com/add/",
          JSON.stringify(data)
        )
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
  };

  const handeCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-product">
      <header>
        <h1>Add Product</h1>
        <div className="buttons">
          <button id="save-btn" onClick={handeSave}>
            Save
          </button>
          <button id="cancel-btn" onClickCapture={handeCancel}>
            Cancel
          </button>
        </div>
      </header>
      <div className="content add-form">
        <form id="product_form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sku">
            <span>SKU</span>
            <input
              type="text"
              id="sku"
              name="sku"
              value={skuField}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            <span>Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={nameField}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            <span>Price ($)</span>
            <input
              type="number"
              min={1}
              id="price"
              name="price"
              value={priceField}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="productType">
            <span>Type Switcher</span>
            <select
              id="productType"
              name="productType"
              onChange={handleChange}
              value={productTypeField}
            >
              <option value="" disabled>
                Type Switcher
              </option>
              <option id="DVD" value="dvd_attributes">
                DVD
              </option>
              <option id="Book" value="book_attributes">
                Book
              </option>
              <option id="Furniture" value="furniture_attributes">
                Furniture
              </option>
            </select>
          </label>
          {productTypeField === "dvd_attributes" ? (
            <>
              <label htmlFor="size">
                <span>Size</span>
                <input
                  type="number"
                  min={1}
                  id="size"
                  name="size"
                  value={sizeField}
                  onChange={handleChange}
                />
              </label>
              <p className="desctiption">
                <span>Desctiption:</span>
                <strong>Please, provide size in (MB)</strong>
              </p>
            </>
          ) : productTypeField === "book_attributes" ? (
            <>
              <label htmlFor="weight">
                <span>Weight</span>
                <input
                  type="number"
                  min={1}
                  id="weight"
                  name="weight"
                  value={weightField}
                  onChange={handleChange}
                />
              </label>
              <p className="desctiption">
                <span>Desctiption:</span>
                <strong>Please, provide weight in (KG)</strong>
              </p>
            </>
          ) : productTypeField === "furniture_attributes" ? (
            <>
              <label htmlFor="height">
                <span>Height</span>
                <input
                  type="number"
                  min={1}
                  id="height"
                  name="height"
                  value={heightField}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="width">
                <span>Width</span>
                <input
                  type="number"
                  min={1}
                  id="width"
                  name="width"
                  value={widthField}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="length">
                <span>Length</span>
                <input
                  type="number"
                  min={1}
                  id="length"
                  name="length"
                  value={lengthField}
                  onChange={handleChange}
                />
              </label>
              <p className="desctiption">
                <span>Desctiption:</span>
                <strong>
                  Please provide dimensions in (CM) for (H<small> x </small>W
                  <small> x </small>L) format
                </strong>
              </p>
            </>
          ) : null}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddProduct;
