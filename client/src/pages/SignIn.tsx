import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../components/index";
import {
  EmailValidation,
  PasswordValidation,
} from "../utils/validations/index";
import { UserAuthentication } from "../utils/Logic/index";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); 

  const handleSignIn = async () => {
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }
    try {
      const response = await UserAuthentication.logIn(email, password);
      if (response) {
        console.log("SignIn Successful", response);
        navigate("/dashboard"); // Navigate to dashboard or another route
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    } catch (err) {
      console.error("SignIn Error:", err);
      setError("An unexpected error occurred.");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    navigate("/signUp");
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

      {/* Sign In Section */}
      <h2 className="font-light text-center my-16">
        <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-[Times_New_Roman]">
          <span>S I G N</span>
          <span className="ml-10">I N</span>
        </span>
        <hr className="w-[80%] mx-auto border-t border-white" />
      </h2>

      {/* Sign In Card */}
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] w-full rounded-lg my-6 mx-auto">
        <div className="flex flex-col gap-4 p-6">
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
              className="absolute top-8 right-3 text-slate-600 hover:text-slate-700"
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

          <div className="inline-flex items-center mt-2">
            <label
              className="flex items-center cursor-pointer relative"
              htmlFor="check-2"
            >
              <input
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="check-2"
              />
              <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <label
              className="cursor-pointer ml-2 text-slate-600 text-sm"
              htmlFor="check-2"
            >
              Remember Me
            </label>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <a
              href="#signUp"
              className="ml-1 text-sm font-semibold text-slate-700 underline"
              onClick={(e) => {
                e.preventDefault();
                handleSignUpClick();
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
