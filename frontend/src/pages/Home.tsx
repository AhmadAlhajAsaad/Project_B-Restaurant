import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Our Restaurant</h1>
        <p>Experience the finest cuisine in town</p>
        <Link to="/menu" className="btn">View Menu</Link>
      </div>

      <div className="menu-grid">
        <div className="menu-item">
          <h3>Delicious Food</h3>
          <p>Fresh ingredients, expertly prepared by our talented chefs. From Italian classics to modern fusion cuisine.</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>

        <div className="menu-item">
          <h3>Make a Reservation</h3>
          <p>Book your table in advance and enjoy a seamless dining experience with friends and family.</p>
          <Link to="/reservations" className="btn btn-primary">Reserve Now</Link>
        </div>

        <div className="menu-item">
          <h3>Order Online</h3>
          <p>Craving our food at home? Order online and we'll deliver it fresh to your doorstep.</p>
          <Link to="/order" className="btn btn-primary">Order Now</Link>
        </div>
      </div>

      {/* Restaurant Information Section */}
      <div className="restaurant-info">
        <h2>Restaurant Information</h2>
        <div className="info-grid">
          <div>
            <h3>Opening Hours</h3>
            <p>
              Mon–Thu: 11:00 AM – 09:00 PM<br />
              Fri–Sat: 11:00 AM – 09:00 PM<br />
              Sun: 12:00 PM – 9:00 PM
            </p>
          </div>
          <div>
            <h3>Location</h3>
            <p>
              123 Main Street<br />
              Cityville, ST 12345
            </p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>
              Phone: (123) 456-7890<br />
              Email: info@restaurant.com
            </p>
          </div>
        </div>
      </div>

      <div className="why-choose">
        <h2>Why Choose Us?</h2>
        <div className="why-grid">
          <div>
            <h3>Fresh Ingredients</h3>
            <p>We source only the finest, freshest ingredients for every dish.</p>
          </div>
          <div>
            <h3>Expert Chefs</h3>
            <p>Our experienced chefs bring passion and creativity to every plate.</p>
          </div>
          <div>
            <h3>Cozy Atmosphere</h3>
            <p>Enjoy your meal in our warm and inviting dining space.</p>
          </div>
          <div>
            <h3>Great Service</h3>
            <p>Our friendly staff ensures you have a memorable experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
