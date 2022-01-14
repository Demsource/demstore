import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import Footer from "./Footer";
const axios = require("axios");

function Home() {
  let navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-juniortest-demi.000webhostapp.com/")
      .then(function (response) {
        Array.isArray(response.data) && setProductsList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handeAdd = () => {
    navigate("add-product");
  };

  const handleCheck = (isSelected, productSKU) => {
    let productSKUString = `'${productSKU}'`;

    if (isSelected) {
      !deleteList.includes(productSKUString) &&
        setDeleteList((list) => [...list, productSKUString]);
    } else {
      setDeleteList((list) => list.filter((item) => item !== productSKUString));
    }
  };

  const handeDelete = (list) => {
    if (list.length) {
      let formData = new FormData();

      formData.append("deleteList", list);

      axios
        .post("https://api-juniortest-demi.000webhostapp.com/delete/", formData)
        .then(function (response) {
          response.data > 0 && window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="home">
      <header>
        <h1>Product List</h1>
        <div className="buttons">
          <button id="add-btn" onClick={handeAdd}>
            ADD
          </button>
          <button
            id="delete-product-btn"
            onClickCapture={() => handeDelete(deleteList)}
          >
            MASS DELETE
          </button>
        </div>
      </header>
      <div className="content products">
        {productsList?.length ? (
          productsList.map((product, i) => (
            <Product data={product} handleCheck={handleCheck} key={i} />
          ))
        ) : (
          <p>NO PRODUCTS..</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
