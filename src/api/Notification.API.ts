import axiosInstance from "@app_api/AxiosInstance";
import type { NotificationDto } from "@app_interfaces/Notification/NotificationDto";

// Get My Notifications
export const getMyNotifications = async (): Promise<NotificationDto[] | null> => {
    try {
        const response = await axiosInstance.get<NotificationDto[]>("/notifications/my");
        return response.data;
    } catch (error: any) {
        return null;
    }
};