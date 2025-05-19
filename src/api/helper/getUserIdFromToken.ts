import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    userId: number;
    exp: number;
    iat: number;
}

export const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("access_token");

    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.userId;
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
};