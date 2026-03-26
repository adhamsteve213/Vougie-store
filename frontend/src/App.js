import React from 'react';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Sets from './pages/sets';
import Tops from './pages/tops';
import Bottoms from './pages/bottoms';
import ProductDetails from './pages/ProductDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contacts from './pages/contacts';
import About from './pages/about';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Carts from './pages/Cart';
import Checkout from './pages/checkout';
import MyOrders from './pages/MyOrders';
import Wishlist from './pages/wishlist';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sets" element={<Sets />} />
              <Route path="/tops" element={<Tops />} />
              <Route path ='/bottoms' element={<Bottoms/>}/>
              <Route path="/product/:category/:id" element={<ProductDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Home />} />
              <Route path= '/carts' element={<Carts />} />
              <Route path= '/checkout' element={<Checkout />} />
              <Route path= '/my-orders' element={<MyOrders />} />
              <Route path= '/wishlist' element={<Wishlist />} />
            </Routes>
            <Footer />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
