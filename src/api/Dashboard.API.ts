import axiosInstance from "@app_api/AxiosInstance";
import type { DashboardStatsDto } from "@app_interfaces/AdminDashboard/DashboardStatsDto";

// Get Admin Dashboard Stats (with year and month)
export const getDashboardStats = async (
    year: number,
    month: number
): Promise<DashboardStatsDto> => {
    try {
        const response = await axiosInstance.get<DashboardStatsDto>(
            `/dashboard/stats`,
            {
                params: { year, month },
            }
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch dashboard statistics.");
        }
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw new Error("Failed to fetch dashboard statistics. Please try again later.");
    }
};
