import api from './api';
import { Reservation } from '../types';

export const reservationService = {
  getAllReservations: async (): Promise<Reservation[]> => {
    const response = await api.get('/Reservations');
    return response.data;
  },

  getReservationById: async (id: number): Promise<Reservation> => {
    const response = await api.get(`/Reservations/${id}`);
    return response.data;
  },

  createReservation: async (payload: any): Promise<Reservation> => {
    const response = await api.post('/Reservations', payload);
    return response.data;
  },

  updateReservation: async (id: number, reservation: Reservation): Promise<void> => {
    await api.put(`/Reservations/${id}`, reservation);
  },

  updateReservationStatus: async (id: number, status: string): Promise<void> => {
    await api.patch(`/Reservations/${id}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  deleteReservation: async (id: number): Promise<void> => {
    await api.delete(`/Reservations/${id}`);
  },
};
