import "./styles/App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import SearchProduct from "./pages/Search/SearchProduct";
import Home from "./pages/Home/Home";
import Snackbar from "./components/Snackbar/Snackbar";

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      {showCart && <Cart />}
      <Snackbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
