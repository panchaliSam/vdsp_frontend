import axiosInstance from "@app_api/AxiosInstance";
import type { NotificationDto } from "@app_interfaces/Notification/NotificationDto";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";
import { handleApiResponse } from "@app_helper/Messages/handleApiResponse";
import { toast } from "react-toastify";

// Get My Notifications
export const getMyNotifications = async (): Promise<NotificationDto[] | null> => {
    try {
        const response = await axiosInstance.get<ApiResponse<NotificationDto[]>>("/notifications/my");
        return handleApiResponse<NotificationDto[]>(response.data);
    } catch (error: any) {
        const message = error?.response?.data?.message || "Failed to fetch notifications.";
        toast.error(message);
        return null;
    }
};