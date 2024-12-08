import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { ProductItem } from "./components/product-item";
import { Navbar } from "./components/navbar";
import { Container } from "./components/container";
import { NotFound } from "./components/not-found";
import { CreateProduct } from "./components/create-product";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Container>
        <Navbar />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductItem />} />
        <Route path="*" element={<NotFound />} />
        <Route path="*/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
