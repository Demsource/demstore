import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="add-product" element={<AddProduct />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
