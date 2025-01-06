import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../components/index";
import { EmailValidation } from "../utils/validations/index";

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
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
            <label className="block mb-2 text-sm text-slate-600">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Your Password"
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
            <label className="block mb-2 text-sm text-slate-600">
              Confirm Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Confirm Password"
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

          <div className="p-6 pt-0">
            <button
              className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
