import type { SessionType } from "@app_interfaces/Reservation/ReservationDto";

export interface CalendarEventDto {
    eventDate: string;
    sessionType: SessionType;
}