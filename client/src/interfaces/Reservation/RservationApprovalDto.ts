export interface ReservationApprovalDto {
  id: number;
  approvedAt: string | null;
  status: ApprovalStatus;
  customerName: string;
  eventType: EventType;
  packageId: number;
  eventLocation: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  sessionType: SessionType;
}

export type ApprovalStatus = "APPROVED" | "DISAPPROVED" | "PENDING";

export type EventType = "WEDDING" | "BIRTHDAY" | "GRADUATION" | "CORPORATE";

export type SessionType =
  | "MORNING_SESSION"
  | "EVENING_SESSION"
  | "FULLDAY_SESSION";
