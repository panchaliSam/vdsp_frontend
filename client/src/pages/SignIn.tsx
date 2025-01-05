// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
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
    </div>
  );
};

export default SignIn;
