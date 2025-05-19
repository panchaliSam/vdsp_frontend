import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { registerUser } from "@app_api/User.API";
import { validateEmail } from "@app_helper/validations/emailValidation";
import { validatePasswordStrength } from "@app_helper/validations/passwordStrengthValidation";
import { capitalizeName } from "@app_helper/validations/capitalizeName";
import { validatePhoneNumber } from "@app_helper/validations/phoneNumberValidation";

type Role = "ROLE_CUSTOMER" | "ROLE_ADMIN" | "ROLE_STAFF";

const RegisterSection: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<Role>("ROLE_CUSTOMER");
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Prepare user data for registration
    const userData = {
      firstName: capitalizeName(firstName),
      lastName: capitalizeName(lastName),
      email,
      password,
      phoneNumber,
      role,
    };

    try {
      await registerUser(userData);
      navigate("/login");
    } catch (apiError: any) {
      setErrors({
        apiError: apiError.message || "Registration failed. Please try again.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value);
      const emailError = validateEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    } else if (field === "password") {
      setPassword(value);
      const passwordError = validatePasswordStrength(value);
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
      if (value !== password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
      }
    } else if (field === "phoneNumber") {
      setPhoneNumber(value);
      const phoneError = validatePhoneNumber(value);
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: phoneError }));
    } else if (field === "firstName") {
      setFirstName(value);
      setFirstName(capitalizeName(value));
    } else if (field === "lastName") {
      setLastName(value);
      setLastName(capitalizeName(value));
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
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e, "firstName")}
          required
        />
        <input
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e, "lastName")}
          required
        />
        <input
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e, "email")}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="relative">
          <input
            className="p-3 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white pr-12"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange(e, "password")}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <button
            type="button"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
          </button>
        </div>
        <div className="relative">
          <input
            className="p-3 w-full border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white pr-12"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleChange(e, "confirmPassword")}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <button
            type="button"
            aria-label={
              confirmPasswordVisible
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? (
              <VisibilityOffIcon />
            ) : (
              <RemoveRedEyeIcon />
            )}
          </button>
        </div>
        <input
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => handleChange(e, "phoneNumber")}
          required
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}

        {/* Role Dropdown */}
        <select
          className="p-3 border border-white rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          required
        >
          <option value="ROLE_CUSTOMER">Customer</option>
          <option value="ROLE_ADMIN">Admin</option>
          <option value="ROLE_STAFF">Staff</option>
        </select>

        <button
          type="submit"
          className="p-3 bg-white text-black border border-white rounded-md transition duration-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-white">
        Already have an account?{" "}
        <Link to="/login" className="text-white hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default RegisterSection;
