import axiosInstance from "@app_api/AxiosInstance";
import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

// Get All Staff Members
export const getAllStaff = async (): Promise<StaffDto[]> => {
    try {
        const response = await axiosInstance.get("/staff/getAll");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch staff list:", error);
        throw new Error("Unable to fetch staff members. Please try again later.");
    }
};