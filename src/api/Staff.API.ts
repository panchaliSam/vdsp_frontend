import axiosInstance from "@app_api/AxiosInstance";
import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

// Get All Staff Members
export const getAllStaff = async (): Promise<StaffDto[]> => {
    try {
        const response = await axiosInstance.get<StaffDto[]>("/staff/getAll");
        console.log("Fetched staffList:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching staff list:", error);
        return [];
    }
};