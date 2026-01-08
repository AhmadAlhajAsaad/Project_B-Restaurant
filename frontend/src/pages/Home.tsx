import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Our Restaurant</h1>
        <p>Experience the finest cuisine in town</p>
        <Link to="/menu" className="btn">View Menu</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="menu-item">
          <h3>🍕 Delicious Food</h3>
          <p>Fresh ingredients, expertly prepared by our talented chefs. From Italian classics to modern fusion cuisine.</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>

        <div className="menu-item">
          <h3>📅 Make a Reservation</h3>
          <p>Book your table in advance and enjoy a seamless dining experience with friends and family.</p>
          <Link to="/reservations" className="btn btn-primary">Reserve Now</Link>
        </div>

        <div className="menu-item">
          <h3>🚗 Order Online</h3>
          <p>Craving our food at home? Order online and we'll deliver it fresh to your doorstep.</p>
          <Link to="/order" className="btn btn-primary">Order Now</Link>
        </div>
      </div>

      {/* Restaurant Information Section */}
      <div style={{ marginTop: '4rem', marginBottom: '4rem', textAlign: 'center', background: '#f8f9fa', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Restaurant Information</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', fontSize: '1.1rem' }}>
          <div>
            <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>Opening Hours</h3>
            <p style={{ margin: 0 }}>
              Mon–Thu: 11:00 AM – 10:00 PM<br />
              Fri–Sat: 11:00 AM – 11:00 PM<br />
              Sun: 12:00 PM – 9:00 PM
            </p>
          </div>
          <div>
            <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>Location</h3>
            <p style={{ margin: 0 }}>
              123 Main Street<br />
              Cityville, ST 12345
            </p>
          </div>
          <div>
            <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>Contact</h3>
            <p style={{ margin: 0 }}>
              Phone: (123) 456-7890<br />
              Email: info@restaurant.com
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div style={{ marginTop: '0', textAlign: 'center' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Why Choose Us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h3 style={{ color: '#3498db' }}>Fresh Ingredients</h3>
            <p>We source only the finest, freshest ingredients for every dish.</p>
          </div>
          <div>
            <h3 style={{ color: '#3498db' }}>Expert Chefs</h3>
            <p>Our experienced chefs bring passion and creativity to every plate.</p>
          </div>
          <div>
            <h3 style={{ color: '#3498db' }}>Cozy Atmosphere</h3>
            <p>Enjoy your meal in our warm and inviting dining space.</p>
          </div>
          <div>
            <h3 style={{ color: '#3498db' }}>Great Service</h3>
            <p>Our friendly staff ensures you have a memorable experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
