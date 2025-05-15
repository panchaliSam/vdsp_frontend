import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

export interface StaffRoleDto {
    id: number;
    staffId: number;
    staff: StaffDto;
    roleName: string;
    assignStatus: StaffAssignStatus;
    assignedAt: string | null;
}

export type StaffAssignStatus = "ASSIGNED" | "NOT_ASSIGNED";
