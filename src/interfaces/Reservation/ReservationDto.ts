export interface ReservationDto {
  id?: number;
  eventType: EventType;
  eventLocation: string;
  eventDate: string; // Format: YYYY-MM-DD
  eventStartTime: string; // Format: HH:mm
  eventEndTime: string; // Format: HH:mm
  packageId?: number;
  packageName?: string;
  priceAmount?: string;
  customerName?: string;
  sessionType?: SessionType;
}

export type EventType = "WEDDING" | "BIRTHDAY" | "GRADUATION" | "CORPORATE";
export type SessionType =
  | "MORNING_SESSION"
  | "EVENING_SESSION"
  | "FULLDAY_SESSION";
