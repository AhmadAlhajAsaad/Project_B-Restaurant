import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Order from './pages/Order';
import Orders from './pages/Orders';
import AllReservations from './pages/AllReservations';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <nav>
            <h1>Restaurant</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/order">Order Online</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><Link to="/all-reservations">All Reservations</Link></li>
            </ul>
          </nav>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/all-reservations" element={<AllReservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
