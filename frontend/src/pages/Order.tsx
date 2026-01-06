import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { createOrder, getOrderById, updateOrder, updateOrderStatus, deleteOrder } from '../services/orderService';
import { MenuItem, OrderItem, Order as OrderType } from '../types';

const Order: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: ''
  });

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await menuService.getAllMenuItems();
      setMenuItems(items.filter(item => item.isAvailable));
      setError(null);
    } catch (err) {
      setError('Failed to load menu items. Please make sure the backend is running.');
      console.error('Error loading menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.menuItemId === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.menuItemId === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        menuItemId: item.id,
        menuItemName: item.name,
        price: item.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.menuItemId !== menuItemId));
    } else {
      setCart(cart.map(item =>
        item.menuItemId === menuItemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setError('Please add items to your cart');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const order: Omit<OrderType, 'id' | 'createdAt' | 'status'> = {
        ...customerInfo,
        totalAmount: getTotalAmount(),
        orderItems: cart
      };

      await createOrder(order);
      setSuccess(true);
      setCart([]);
      setCustomerInfo({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryAddress: ''
      });
    } catch (err) {
      setError('Failed to place order. Please make sure the backend is running.');
      console.error('Error placing order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="container">
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Order Online</h1>

      {success && (
        <div className="success">
          Order placed successfully! We'll contact you soon with delivery details.
        </div>
      )}

      {error && (
        <div className="error" style={{ padding: '1rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Menu</h2>
          <div className="menu-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
            {menuItems.map(item => (
              <div key={item.id} className="menu-item">
                <h3>{item.name}</h3>
                <span className="category">{item.category}</span>
                <p>{item.description}</p>
                <div className="price">${item.price.toFixed(2)}</div>
                <button onClick={() => addToCart(item)} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Your Cart</h2>
          
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.menuItemId} className="cart-item">
                  <div>
                    <strong>{item.menuItemName}</strong>
                    <div>${item.price.toFixed(2)} each</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)} className="btn">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)} className="btn">+</button>
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <h3>Total: <span className="cart-total">${getTotalAmount().toFixed(2)}</span></h3>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={customerInfo.customerName}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={customerInfo.customerEmail}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={customerInfo.customerPhone}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Address *</label>
                  <textarea
                    name="deliveryAddress"
                    value={customerInfo.deliveryAddress}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success" disabled={submitting}>
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
