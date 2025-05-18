import axiosInstance from "@app_api/AxiosInstance";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import type { CalendarDatesResponse } from "@app_interfaces/Calendar/CalendarDatesResponse";

export const getCalendarDates = async (): Promise<CalendarDatesResponse | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<CalendarDatesResponse>>(
            "/calendar/dates"
        );
        return handleApiResponse<CalendarDatesResponse>(response.data);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load calendar dates.");
        return null;
    }
};