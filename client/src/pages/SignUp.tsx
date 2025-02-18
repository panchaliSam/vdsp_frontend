import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../components/index";
import {
  EmailValidation,
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../utils/validations/index";
import { UserAuthentication } from "../utils/Logic/UserAuthenticationLogic";
import { UserApi } from "../utils/api";

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);
    const confirmPasswordError = ConfirmPasswordValidation(
      password,
      confirmPassword
    );

    if (emailError || passwordError || confirmPasswordError) {
      setError(emailError || passwordError || confirmPasswordError);
      return;
    }

    try {
      const response = await UserAuthentication.signUp(email, password);
      if (response) {
        const payload = {
          ...response,
          userToken: response.token,
        };
        await UserApi.storeUser(payload);
        console.log("SignUp Successful", response);
        navigate("/signIn");
      } else {
        setError("Failed to create an account. Try again.");
      }
    } catch (err) {
      console.error("SignUp Error:", err);
      setError("An unexpected error occurred.");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSignInClick = () => {
    navigate("/signIn");
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-0 left-4 flex items-center text-white bg-transparent border border-white px-3 py-2 rounded hover:bg-white hover:text-black transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Sign Up Section */}
      <h2 className="font-light text-center my-16">
        <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-[Times_New_Roman]">
          <span>S I G N</span>
          <span className="ml-10">U P</span>
        </span>
        <hr className="w-[80%] mx-auto border-t border-white" />
      </h2>

      {/* Sign Up Card */}
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] w-full rounded-lg my-6 mx-auto">
        <div className="flex flex-col gap-4 p-6">
          {/* Email Input */}
          <div className="w-full max-w-sm min-w-[200px]">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              validationFn={EmailValidation}
            />
          </div>

          {/* Password Input */}
          <div className="w-full max-w-sm min-w-[200px] relative">
            <InputField
              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              validationFn={PasswordValidation}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[35px] right-3 text-slate-600 hover:text-slate-700"
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.96 10.96 0 0112 20c-7 0-11-8-11-8a20.87 20.87 0 015-5m3.18 1.82A4 4 0 0112 8c1.1 0 2.1.45 2.83 1.17M1 1l22 22" />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="w-full max-w-sm min-w-[200px] relative">
            <InputField
              label="Confirm Password"
              type={passwordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[35px] right-3 text-slate-600 hover:text-slate-700"
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.96 10.96 0 0112 20c-7 0-11-8-11-8a20.87 20.87 0 015-5m3.18 1.82A4 4 0 0112 8c1.1 0 2.1.45 2.83 1.17M1 1l22 22" />
                </svg>
              )}
            </button>
          </div>

          <div className="p-6 pt-0">
            <button
              className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <p className="flex justify-center mt-6 text-sm text-slate-600">
              Have an account?
              <a
                href="#signIn"
                className="ml-1 text-sm font-semibold text-slate-700 underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignInClick();
                }}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
