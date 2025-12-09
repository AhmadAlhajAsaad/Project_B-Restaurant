import api from './api';
import { MenuItem } from '../types';

export const menuService = {
  getAllMenuItems: async (): Promise<MenuItem[]> => {
    const response = await api.get('/MenuItems');
    return response.data;
  },

  getMenuItemById: async (id: number): Promise<MenuItem> => {
    const response = await api.get(`/MenuItems/${id}`);
    return response.data;
  },

  getMenuItemsByCategory: async (category: string): Promise<MenuItem[]> => {
    const response = await api.get(`/MenuItems/category/${category}`);
    return response.data;
  },

  createMenuItem: async (menuItem: Omit<MenuItem, 'id' | 'createdAt'>): Promise<MenuItem> => {
    const response = await api.post('/MenuItems', menuItem);
    return response.data;
  },

  updateMenuItem: async (id: number, menuItem: MenuItem): Promise<void> => {
    await api.put(`/MenuItems/${id}`, menuItem);
  },

  deleteMenuItem: async (id: number): Promise<void> => {
    await api.delete(`/MenuItems/${id}`);
  },
};
