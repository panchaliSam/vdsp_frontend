import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, forgotPassword } from "@app_api/User.API";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import { motion } from "framer-motion";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import type { LoginPayload } from "@app_interfaces/User/LoginPayload";
import type { TokenResponse } from "@app_interfaces/User/TokenResponse";
import type { Role } from "@app_interfaces/User/UserDto";
import { useAuth } from "@app_context/AuthContext";

const LoginSection: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userData: LoginPayload = { email, password };

    try {
      const response: TokenResponse = await login(userData);
      if (response?.access_token) {
        const userRole: Role = response.userDetails.role as Role;
        authLogin(userRole);

        switch (userRole) {
          case "ROLE_ADMIN":
            navigate("/admin");
            break;
          case "ROLE_STAFF":
            navigate("/staff");
            break;
          case "ROLE_CUSTOMER":
            navigate("/customer");
            break;
          default:
            setError("Unknown role. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    setForgotSuccess(null);
    setForgotError(null);

    try {
      await forgotPassword({ email: forgotEmail });
      setForgotSuccess("Reset link sent to your email.");
    } catch (error) {
      setForgotError("Failed to send reset link. Please try again.");
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
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            className="p-3 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white pr-12"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
          </button>
        </div>

        <div className="text-right text-sm text-white">
          <button
            type="button"
            className="hover:underline"
            onClick={() => setShowForgotPassword(!showForgotPassword)}
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="p-3 bg-transparent border border-white bg-white text-black rounded-md transition duration-300"
        >
          Sign In
        </button>
      </form>

      {showForgotPassword && (
        <div className="mt-4">
          <input
            className="p-2 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <button
            type="button"
            onClick={handleForgotPassword}
            className="mt-2 w-full p-2 bg-white text-black rounded-md transition duration-300"
          >
            Send Reset Link
          </button>
          {forgotSuccess && (
            <p className="text-green-400 text-sm mt-2">{forgotSuccess}</p>
          )}
          {forgotError && (
            <p className="text-red-500 text-sm mt-2">{forgotError}</p>
          )}
        </div>
      )}

      <p className="mt-4 text-center text-sm text-white">
        Don't have an account?{" "}
        <Link to="/register" className="text-white hover:underline">
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginSection;