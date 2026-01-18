import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pizza', 'Pasta', 'Salad', 'Dessert'];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await menuService.getAllMenuItems();
      setMenuItems(items);
      setError(null);
    } catch (err) {
      setError('Failed to load menu items. Please make sure the backend is running and try again.');
      console.error('Error loading menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error" style={{ padding: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Our Menu</h1>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="btn"
            style={{
              backgroundColor: selectedCategory === category ? '#3498db' : '#ecf0f1',
              color: selectedCategory === category ? 'white' : '#2c3e50'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p>No items found in this category.</p>
      ) : (
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <span className="category">{item.category}</span>
              <p>{item.description}</p>
              <div className="price">${item.price.toFixed(2)}</div>
              {!item.isAvailable && (
                <p style={{ color: '#e74c3c', marginTop: '0.5rem' }}>Currently Unavailable</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
