import axiosInstance from "@app_api/AxiosInstance";
import type { StaffDto } from "@app_interfaces/Staff/StaffDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get All Staff Members
export const getAllStaff = async (): Promise<StaffDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<StaffDto[]>>("/staff/getAll");
        return handleApiResponse(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Unable to fetch staff members. Please try again later.");
        return null;
    }
};