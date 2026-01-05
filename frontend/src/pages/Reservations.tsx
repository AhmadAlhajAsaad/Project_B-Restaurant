import React, { useState } from 'react';
import { reservationService } from '../services/reservationService';
import { Reservation } from '../types';

const Reservations: React.FC = () => {
    const [showReservations, setShowReservations] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loadingReservations, setLoadingReservations] = useState(false);
    const handleShowReservations = async () => {
      setLoadingReservations(true);
      try {
        const data = await reservationService.getAllReservations();
        setReservations(data);
        setShowReservations(true);
      } catch (err) {
        setError('Failed to fetch reservations.');
      } finally {
        setLoadingReservations(false);
      }
    };
  const [formData, setFormData] = useState<Omit<Reservation, 'id' | 'createdAt' | 'status'>>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: 2,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Combine date and time into a single ISO string for backend
      const combinedDateTime = new Date(
        `${formData.reservationDate}T${formData.reservationTime}`
      );
        // Send reservationDate as date-only and reservationTime as time-only string
        // Ensure reservationTime is in HH:mm:ss format
        let time = formData.reservationTime;
        if (time && time.length === 5) {
          time = time + ':00';
        }
        const payload = {
          ...formData,
          reservationDate: formData.reservationDate,
          reservationTime: time
        };
        await reservationService.createReservation(payload);
        setSuccess(true);
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          reservationDate: '',
          reservationTime: '',
          numberOfGuests: 2,
          specialRequests: ''
        });
        // Refresh reservations list if visible
        if (showReservations) {
          try {
            const data = await reservationService.getAllReservations();
            setReservations(data);
          } catch (err) {
            setError('Failed to fetch reservations.');
          }
        }
    } catch (err) {
      setError('Failed to create reservation. Please make sure the backend is running.');
      console.error('Error creating reservation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Make a Reservation</h2>
        {success && (
          <div className="success">
            Reservation created successfully! We'll contact you soon to confirm.
          </div>
        )}
        {error && (
          <div className="error" style={{ padding: '1rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* ...existing form code... */}
          <div className="form-group">
            <label htmlFor="customerName">Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail">Email *</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerPhone">Phone *</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationDate">Date *</label>
            <input
              type="date"
              id="reservationDate"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationTime">Time *</label>
            <input
              type="time"
              id="reservationTime"
              name="reservationTime"
              value={formData.reservationTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfGuests">Number of Guests *</label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="specialRequests">Special Requests</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any dietary restrictions or special occasions?"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Make Reservation'}
          </button>
        </form>
        <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={handleShowReservations} disabled={loadingReservations}>
          {loadingReservations ? 'Loading...' : 'Show All Reservations'}
        </button>
        {showReservations && (
          <div className="reservations-list" style={{ marginTop: '2rem' }}>
            <h3>All Reservations</h3>
            {reservations.length === 0 ? (
              <p>No reservations found.</p>
            ) : (
              <ul>
                {reservations.map(r => (
                  <li key={r.id}>
                    <strong>{r.customerName}</strong> | {r.customerEmail} | {r.customerPhone} | {r.reservationDate?.toString().slice(0, 16)} | Guests: {r.numberOfGuests} | Status: {r.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
