import axiosInstance from "@app_api/AxiosInstance";
import type { CalendarDatesResponse } from "@app_interfaces/Calendar/CalendarDatesResponse";

export const getCalendarDates = async (): Promise<CalendarDatesResponse | null> => {
    try {
        const response = await axiosInstance.get<CalendarDatesResponse>(
            "/calendar/dates"
        );
        return response.data;
    } catch (error: any) {
        return null;
    }
};