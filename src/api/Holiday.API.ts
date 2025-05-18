import type { HolidayDto } from "@app_interfaces/Calendar/HolidayDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";
import axiosInstance from "@app_api/AxiosInstance";

export const addHoliday = async (holiday: HolidayDto): Promise<HolidayDto | null> => {
    try {
        const response = await axiosInstance.post<ApiResponse<HolidayDto>>(
            "/holidays/add",
            holiday
        );
        toast.success("Holiday added successfully");
        return handleApiResponse<HolidayDto>(response.data);
    } catch (error: any) {
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Failed to add holiday.");
        }
        return null;
    }
};