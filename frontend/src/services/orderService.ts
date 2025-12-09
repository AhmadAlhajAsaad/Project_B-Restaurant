import api from './api';
import { Order } from '../types';

export const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/Orders');
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get(`/Orders/${id}`);
    return response.data;
  },

  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const response = await api.post('/Orders', order);
    return response.data;
  },

  updateOrder: async (id: number, order: Order): Promise<void> => {
    await api.put(`/Orders/${id}`, order);
  },

  updateOrderStatus: async (id: number, status: string): Promise<void> => {
    await api.patch(`/Orders/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  deleteOrder: async (id: number): Promise<void> => {
    await api.delete(`/Orders/${id}`);
  },
};
