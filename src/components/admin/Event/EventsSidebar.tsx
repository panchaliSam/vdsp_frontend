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
    <div className="bg-[#18181b] rounded-xl shadow-xl p-8 min-h-[400px]">
      <h2 className="text-3xl font-bold text-white mb-8">Events</h2>
      <div className="border-t border-gray-700 mb-6" />
      <div className="flex flex-col gap-4">
        {events.map(ev => (
          <div
            key={ev.id}
            onClick={() => onSelect(ev.id)}
            className={`rounded-lg p-5 cursor-pointer transition-all duration-200 border-2 ${selectedId === ev.id ? 'border-blue-500 bg-[#23272f] shadow-lg' : 'border-gray-700 bg-[#23272f] hover:border-blue-400 hover:bg-[#23272f]/80'} group`}
          >
            <div className="font-semibold text-white text-lg group-hover:text-blue-300 transition-all duration-200">
              {ev.reservationDetails.customerName || 'Event'}
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {ev.reservationDetails.eventType} &mdash; {ev.eventDate}
            </div>
          </div>
        ))}
        {events.length === 0 && <div className="text-gray-400">No events found.</div>}
      </div>
    </div>
  );
};

export default EventsSidebar; 