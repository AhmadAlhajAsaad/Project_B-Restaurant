import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/reservationService';
import { Reservation } from '../types';

const AllReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await reservationService.getAllReservations();
        setReservations(data);
      } catch (err) {
        setError('Failed to fetch reservations.');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div className="container">
      <h2>All Reservations</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {!loading && reservations.length === 0 && <p>No reservations found.</p>}
      {!loading && reservations.length > 0 && (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Special Requests</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.customerName}</td>
                <td>{r.customerEmail}</td>
                <td>{r.customerPhone}</td>
                <td>{r.reservationDate}</td>
                <td>{r.reservationTime}</td>
                <td>{r.numberOfGuests}</td>
                <td>{r.status}</td>
                <td>{r.specialRequests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllReservations;
