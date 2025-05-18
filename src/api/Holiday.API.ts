import type { HolidayDto } from "@app_interfaces/Calendar/HolidayDto";
import axiosInstance from "@app_api/AxiosInstance";

export const addHoliday = async (holiday: HolidayDto): Promise<HolidayDto | null> => {
    try {
        const response = await axiosInstance.post<HolidayDto>(
            "/holidays/add",
            holiday
        );
        return response.data;
    } catch (error: any) {
        return null;
    }
};