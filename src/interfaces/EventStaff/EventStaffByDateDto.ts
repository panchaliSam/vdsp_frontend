import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

export interface EventStaffByDateDto {
    eventDate: string;
    staffList: StaffDto[];
}