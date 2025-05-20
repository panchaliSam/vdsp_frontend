import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "@app_api/User.API";
import { motion } from "framer-motion";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Reset token is missing or invalid.");
        }
    }, [token]);

    const handleReset = async () => {
        setError(null);
        setSuccess(null);

        if (!token) {
            setError("Reset token is missing from the URL.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const message = await resetPassword({ token, newPassword });
            setSuccess(message);
        } catch (err: any) {
            setError(err.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="w-96 mx-auto mt-24 p-6 bg-gradient-to-r from-black via-gray-800 to-black rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center mb-6">
                <img src={Logo} alt="Logo" className="h-16" />
            </div>

            <h2 className="text-white text-xl font-semibold mb-4 text-center">
                Reset Your Password
            </h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-400 text-sm mb-2">{success}</p>}

            {/* New Password */}
            <div className="relative mb-4">
                <input
                    className="p-3 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white pr-12"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                >
                    {showNewPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-4">
                <input
                    className="p-3 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white pr-12"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </button>
            </div>

            <button
                className="p-3 bg-white text-black w-full rounded-md transition duration-300"
                onClick={handleReset}
                disabled={loading}
            >
                {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="mt-4 text-center text-sm text-white">
                Go back to{" "}
                <Link to="/login" className="text-white hover:underline">
                    Login
                </Link>
            </p>
        </motion.div>
    );
};

export default ResetPassword;