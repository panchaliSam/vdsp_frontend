import type { StaffDto } from "@app_interfaces/Staff/StaffDto";
import type { EventDto } from "@app_interfaces/Event/EventDto";

export interface EventStaffDto {
    id: number;
    eventDto: EventDto;
    staff: StaffDto | null;
    eventDate: string;
    assignedAt: string | null;
}