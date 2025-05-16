import { toast } from "react-toastify";
import type { ApiResponse } from "@app_interfaces/Response/ApiResponse";

export function handleApiResponse<T>(response: ApiResponse<T>): T | null {
    if (response.success) {
        toast.success(response.message);
        return response.data;
    } else {
        toast.error(response.message);
        return null;
    }
}