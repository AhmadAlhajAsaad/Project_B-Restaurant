
import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderService';
import { Order } from '../types';

import './Orders.css'; // Add this for custom styles (create file if needed)

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="orders-loading">Loading orders...</div>;
  if (error) return <div className="orders-error">{error}</div>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order History</h2>
      {orders.length === 0 ? (
        <p className="orders-empty">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <span className="order-id">Order #{order.id}</span>
                <span className={`order-status status-${order.status?.toLowerCase()}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <div><strong>Name:</strong> {order.customerName}</div>
                <div><strong>Email:</strong> {order.customerEmail}</div>
                <div><strong>Phone:</strong> {order.customerPhone}</div>
                <div><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</div>
                <div><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</div>
              </div>
              {order.orderItems && order.orderItems.length > 0 && (
                <div className="order-items">
                  <strong>Items:</strong>
                  <ul>
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>
                        {item.menuItemName} x{item.quantity} (${item.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
