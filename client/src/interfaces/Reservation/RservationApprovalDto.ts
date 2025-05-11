export interface ReservationApprovalDto {
  id: number;
  reservationId: number;
  userId: number;
  status: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
}

export type ApprovalStatus = "APPROVED" | "DISAPPROVED" | "PENDING";
