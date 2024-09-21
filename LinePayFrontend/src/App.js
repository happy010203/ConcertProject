
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ShoppingCard/MovieList';
import CheckOut from './ShoppingCard/CheckOut';
import Area from './ShoppingCard/area';
import MovieDetail from './ShoppingCard/MovieDetail';
import { CartContext } from './CartContext'
import { useState } from 'react';

function App() {

  //給CartContext.Provider用
  const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <nav>
          <Link to="/">產品列表</Link>
          <Link to="/CheckOut">購物車</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/MovieDetail/:id" element={<MovieDetail />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/area/:showtime_id" element={<Area />} />
          <Route path="*" element={<h1>找不到頁面</h1>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}
//<Route path=':id' element={<MovieDetail />} /> 加入這一行，將使網址變成"http://localhost:3000/MovieDetail/1" 如此便可以使用id來區分不同產品頁面
export default App;
