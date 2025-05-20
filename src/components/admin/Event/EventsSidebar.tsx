import { useEffect, useState } from "react";
import { getAllEvents } from "@app_api/Event.API";
import type { EventDto } from "@app_interfaces/Event/EventDto";

interface EventsSidebarProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const EventsSidebar = ({ selectedId, onSelect }: EventsSidebarProps) => {
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    getAllEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Events</h2>
      <div style={{ borderTop: '1px solid #ccc', margin: '1rem 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {events.map(ev => (
          <div
            key={ev.id}
            onClick={() => onSelect(ev.id)}
            style={{
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: 8,
              background: selectedId === ev.id ? '#e0e7ff' : '#fff',
              cursor: 'pointer',
              boxShadow: selectedId === ev.id ? '0 0 0 2px #6366f1' : undefined
            }}
          >
            <div style={{ fontWeight: 600 }}>{ev.reservationDetails.customerName}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{ev.reservationDetails.eventType} &mdash; {ev.eventDate}</div>
          </div>
        ))}
        {events.length === 0 && <div>No events found.</div>}
      </div>
    </div>
  );
};

export default EventsSidebar; 