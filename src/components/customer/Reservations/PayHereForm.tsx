import { useLocation } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "@app_helper/validations/emailValidation";
import { capitalizeName } from "@app_helper/validations/capitalizeName";
import { validatePhoneNumber } from "@app_helper/validations/phoneNumberValidation";
import { validateAddress } from "@app_helper/validations/validateAddress";

const PayHereForm = () => {
  const location = useLocation();
  const { orderId, amount, hash, items } = location.state;

  // Define state variables for customer information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;

    // Handle input change and validation
    if (field === "first_name") {
      setFirstName(value);
      setFirstName(capitalizeName(value));
    } else if (field === "last_name") {
      setLastName(value);
      setLastName(capitalizeName(value));
    } else if (field === "email") {
      setEmail(value);
      const emailError = validateEmail(value);
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    } else if (field === "phone") {
      setPhone(value);
      const phoneError = validatePhoneNumber(value);
      setErrors((prevErrors) => ({ ...prevErrors, phone: phoneError }));
    } else if (field === "address") {
      setAddress(value);
      const addressError = validateAddress(value);
      setErrors((prevErrors) => ({ ...prevErrors, address: addressError }));
    } else if (field === "city") {
      setCity(value);
    }
  };

  return (
    <form
      method="POST"
      action="https://sandbox.payhere.lk/pay/checkout"
      className="bg-black text-white p-8 rounded-lg shadow-xl w-full max-w-4xl"
    >
      <h2 className="text-2xl  text-white font-bold text-center text-gray-800 mb-6">
        Proceed to Payment
      </h2>

      {/* Merchant Details */}
      <div className="space-y-4">
        <div className="hidden">
          <input type="hidden" name="merchant_id" value="1229352" />
          <input
            type="hidden"
            name="return_url"
            value="http://localhost:5173/payment/return"
          />
          <input
            type="hidden"
            name="cancel_url"
            value="http://localhost:5173/payment/cancel"
          />
          <input
            type="hidden"
            name="notify_url"
            value={import.meta.env.VITE_PAYHERE_NOTIFY_URL}
          />
          <input type="hidden" name="hash" value={hash} />
          <input type="hidden" name="country" value="Sri Lanka" />
        </div>

        <h3 className="text-xl text-white font-semibold text-gray-700 mb-4">
          Reservation and Package Details
        </h3>
        <div className=" text-white grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="order_id"
            >
              Order ID
            </label>
            <input
              type="text"
              id="order_id"
              name="order_id"
              value={orderId}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="items"
            >
              Items
            </label>
            <input
              type="text"
              id="items"
              name="items"
              value={items}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="currency"
            >
              Currency
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              value="LKR"
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="amount"
            >
              Amount (LKR)
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              readOnly
            />
          </div>
        </div>

        <h3 className="text-xl text-white text-white font-semibold text-gray-700 mt-8 mb-4">
          Customer Information
        </h3>
        <div className="grid text-white grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => handleChange(e, "first_name")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => handleChange(e, "last_name")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => handleChange(e, "phone")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => handleChange(e, "address")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              className="block text-white text-sm text-gray-600"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => handleChange(e, "city")}
              className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Complete Payment
        </button>
      </div>
    </form>
  );
};

export default PayHereForm;
