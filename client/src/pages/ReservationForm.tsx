import { useState } from "react";

const ReservationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Steps Progress Bar */}
      <ol className="flex items-center w-full mb-4 sm:mb-5 relative">
        <div className="relative w-full">
          {/* Progress Background Line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600"
            style={{ transform: "translateY(-50%)" }}
          ></div>

          {/* Progress Bar */}
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-yellow-600 dark:bg-yellow-300 transition-all"
            style={{
              transform: "translateY(-50%)",
              width: `${(currentStep - 1) * 33}%`,
            }}
          ></div>

          {/* Step Icons */}
          <ol className="relative flex justify-between items-center w-full">
            {/* Step 1 */}
            <li className="relative z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 1
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500"
                }`}
                onClick={() => handleStepClick(1)}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                </svg>
              </div>
            </li>

            {/* Step 2 */}
            <li className="relative z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 2
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500"
                }`}
                onClick={() => handleStepClick(2)}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                  <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                </svg>
              </div>
            </li>

            {/* Step 3 */}
            <li className="relative z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 3
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500"
                }`}
                onClick={() => handleStepClick(3)}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                </svg>
              </div>
            </li>
            {/* Step 4 */}
            <li className="relative z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= 4
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500"
                }`}
                onClick={() => handleStepClick(4)}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                </svg>
              </div>
            </li>
          </ol>
        </div>
      </ol>

      {/* Form Steps */}
      {currentStep === 1 && (
        <form>
          <h6 className="font-light text-center mt-10 mb-2">
            <span className="block text-3l sm:text-4l md:text-5l text-white font-[Times_New_Roman]">
              <span>P E R S O N A L</span>
              <span className="ml-10">I N F O</span>
            </span>
          </h6>
          <hr className="w-[80%] mx-auto border-t border-gray-500 mb-5" />
          <div className="mb-5 ml-36 flex items-start space-x-72">
            <div className="w-full max-w-md">
              <label
                htmlFor="text"
                className="block mb-2 text-xs font-medium text-gray-200 dark:text-gray-500"
              >
                <span className="text-lg font-light">F</span>
                <span className="text-base font-extralight">IRST NAM</span>
                <span className="text-lg font-light">E</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow-sm bg-gray-50 border border-gray-300 !text-black text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full max-w-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 dark:shadow-sm-light"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="w-full max-w-md">
              <label
                htmlFor="email"
                className="block mb-2 text-xs font-medium text-gray-200 dark:text-gray-500"
              >
                <span className="text-lg font-light">L</span>
                <span className="text-base font-extralight">AST NAM</span>
                <span className="text-lg font-light">E</span>
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 !text-black text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full max-w-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 dark:shadow-sm-light"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <h6 className="font-light text-center mt-10 mb-2">
            <span className="block text-3l sm:text-4l md:text-5l text-white font-[Times_New_Roman]">
              <span>C O N T A C T</span>
              <span className="ml-10">I N F O</span>
            </span>
          </h6>
          <hr className="w-[80%] mx-auto border-t border-gray-500 mb-5" />
          <div className="mb-5 ml-36 flex items-start space-x-72">
            <div className="w-full max-w-md">
              <label
                htmlFor="email"
                className="block mb-2 text-xs font-medium text-gray-200 dark:text-gray-500"
              >
                <span className="text-lg font-light">E</span>
                <span className="text-base font-extralight">MAI</span>
                <span className="text-lg font-light">L</span>
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 !text-black text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full max-w-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
              />
            </div>

            <div className="w-full max-w-md">
              <label
                htmlFor="phone"
                className="block mb-2 text-xs font-medium text-gray-200 dark:text-gray-500"
              >
                <span className="text-lg font-light">P</span>
                <span className="text-base font-extralight">HONE NUMBE</span>
                <span className="text-lg font-light">R</span>
              </label>
              <input
                type="text"
                id="phone"
                className="shadow-sm bg-gray-50 border border-gray-300 !text-black text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full max-w-md p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 dark:shadow-sm-light"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="flex items-start mb-5 mt-20">
            <div className="flex items-center h-5 ml-36">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-yellow-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-white dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-yellow-600 hover:underline dark:text-yellow-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-36"
          >
            Next Step: Event Info
          </button>
        </form>
      )}

      {currentStep === 2 && (
        <form>
          <h3 className="mb-4 text-lg font-medium leading-none text-white dark:text-white">
            Event Info
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="event-date"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Event Date
              </label>
              <input
                type="date"
                id="event-date"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="event-type"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Event Type
              </label>
              <select
                id="event-type"
                className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="portrait">Portrait</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Previous Step
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Next Step: Review
            </button>
          </div>
        </form>
      )}

      {currentStep === 3 && (
        <div className="text-center">
          <h3 className="mb-4 text-lg font-medium leading-none text-white dark:text-white">
            Review Info
          </h3>
          <p className="mb-4 text-white dark:text-white">
            Confirm your details before submission.
          </p>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit Reservation
          </button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="text-center">
          <h3 className="mb-4 text-lg font-medium leading-none text-white dark:text-white">
            Review Info
          </h3>
          <p className="mb-4 text-white dark:text-white">
            Confirm your details before submission.
          </p>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit Reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;