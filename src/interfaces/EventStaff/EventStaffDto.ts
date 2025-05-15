import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

export interface EventStaffDto {
    id: number;
    eventId: number;
    staff: StaffDto | null;
    eventDate: string;
    assignedAt: string | null;
}