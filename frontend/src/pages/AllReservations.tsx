import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/reservationService';
import { Reservation } from '../types';
import './AllReservations.css';

const statusClass = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'status-confirmed';
    case 'pending': return 'status-pending';
    case 'cancelled': return 'status-cancelled';
    default: return 'status-default';
  }
};

const formatDate = (date?: string) => {
  if (!date) return '—';
  try {
    return new Date(date).toLocaleDateString('nl-NL', {
      weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return date;
  }
};

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
    <div className="reservations-container">
      <div className="reservations-header">
        <h2>All Reservations</h2>
        {!loading && !error && (
          <p className="reservations-count">{reservations.length} reservation{reservations.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {loading && (
        <div className="reservations-loading">Loading reservations…</div>
      )}

      {error && (
        <div className="reservations-error">{error}</div>
      )}

      {!loading && !error && reservations.length === 0 && (
        <div className="reservations-empty">
          <span className="empty-icon">📋</span>
          No reservations found.
        </div>
      )}

      {!loading && reservations.length > 0 && (
        <div className="reservations-grid">
          {reservations.map(r => (
            <div className="reservation-card" key={r.id}>
              <div className="reservation-card-header">
                <h3>{r.customerName}</h3>
                <span className={`reservation-status ${statusClass(r.status)}`}>
                  {r.status || 'Unknown'}
                </span>
              </div>

              <div className="reservation-datetime">
                <span className="dt-item">
                  <span className="icon">📅</span> {formatDate(r.reservationDate)}
                </span>
                {r.reservationTime && (
                  <span className="dt-item">
                    <span className="icon">🕐</span> {r.reservationTime}
                  </span>
                )}
              </div>

              <div className="reservation-info">
                <div className="reservation-info-row">
                  <span className="icon">👥</span> {r.numberOfGuests} guest{r.numberOfGuests !== 1 ? 's' : ''}
                </div>
                <div className="reservation-info-row">
                  <span className="icon">✉️</span> {r.customerEmail}
                </div>
                <div className="reservation-info-row">
                  <span className="icon">📞</span> {r.customerPhone}
                </div>
              </div>

              {r.specialRequests && (
                <div className="reservation-special">
                  <strong>Special Requests</strong>
                  {r.specialRequests}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReservations;
