import axiosInstance from "@app_api/AxiosInstance";
import type { StaffDto } from "@app_interfaces/Staff/StaffDto";

// Get All Staff Members
export const getAllStaff = async (): Promise<StaffDto[]> => {
    try {
        const response = await axiosInstance.get<ApiResponse<StaffDto[]>>("/staff/getAll");
        console.log("Fetched staffList:", response.data);
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to fetch staff members. Please try again later.");
        return null;
    }
};