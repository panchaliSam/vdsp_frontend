import { useLocation } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "@app_helper/validations/emailValidation";
import { capitalizeName } from "@app_helper/validations/capitalizeName";
import { validatePhoneNumber } from "@app_helper/validations/phoneNumberValidation";
import { validateAddress } from "@app_helper/validations/validateAddress";
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HeroSectionImageJpg from "@app_assets/HeroSection/HeroSection.jpg";

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
    <>
          <div className="fixed inset-0 -z-10 w-full h-full"
      draggable={false}>
        <img
          src={HeroSectionImageJpg}
          alt="Lens Macro Hero"
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          style={{ minHeight: '100vh' }}
          loading="eager"
          draggable={false}
        />
      </div>
   
      <div className="w-full max-w-xl rounded-2xl shadow-2xl border border-gray-800 bg-white/10 backdrop-blur-lg p-4 sm:p-6 md:p-4 lg:p-4 animate-fadeInUp h-[90vh] max-h-[90vh] overflow-auto flex flex-col justify-center">
        <Typography variant="h3" align="center" className="text-white font-bold mb-1 tracking-tight drop-shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl">
          Checkout
        </Typography>
        <Typography align="center" className="text-blue-200 mb-3 text-xs sm:text-sm">
          <PaymentIcon className="text-blue-400 mr-2" fontSize="small" />
          Secure payment powered by PayHere
        </Typography>
        <form
          method="POST"
          action="https://sandbox.payhere.lk/pay/checkout"
          className="w-full text-white"
        >
          {/* Merchant Details (hidden) */}
          <div className="hidden">
            <input type="hidden" name="merchant_id" value="1229352" />
            <input type="hidden" name="return_url" value="http://localhost:5173/payment/return" />
            <input type="hidden" name="cancel_url" value="http://localhost:5173/payment/cancel" />
            <input type="hidden" name="notify_url" value={import.meta.env.VITE_PAYHERE_NOTIFY_URL} />
            <input type="hidden" name="hash" value={hash} />
            <input type="hidden" name="country" value="Sri Lanka" />
          </div>
          {/* Reservation and Package Details */}
          <Typography variant="h6" className="text-white font-semibold mb-2 mt-1 tracking-wide text-base">Reservation & Package Details</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="order_id">Order</label>
              <input type="text" id="order_id" name="order_id" value={orderId} className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" readOnly />
              <span className="absolute left-2 top-6.5 text-blue-400"><PaymentIcon fontSize="small" /></span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="items">Package</label>
              <input type="text" id="items" name="items" value={items} className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" readOnly />
              <span className="absolute left-2 top-6.5 text-blue-400"><PaymentIcon fontSize="small" /></span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="currency">Currency</label>
              <input type="text" id="currency" name="currency" value="LKR" className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" readOnly />
              <span className="absolute left-2 top-6.5 text-blue-400"><PaymentIcon fontSize="small" /></span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="amount">Amount</label>
              <input type="text" id="amount" name="amount" value={amount} className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" readOnly />
              <span className="absolute left-2 top-6.5 text-blue-400"><PaymentIcon fontSize="small" /></span>
            </div>
          </div>
          <div className="border-t border-gray-700 my-4" />
          {/* Customer Information */}
          <Typography variant="h6" className="text-white font-semibold mb-2 mt-1 tracking-wide text-base">Customer Information</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" value={firstName} onChange={(e) => handleChange(e, "first_name")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><PersonIcon fontSize="small" /></span>
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" value={lastName} onChange={(e) => handleChange(e, "last_name")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><PersonIcon fontSize="small" /></span>
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="email">Email Address</label>
              <input type="text" id="email" name="email" value={email} onChange={(e) => handleChange(e, "email")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><EmailIcon fontSize="small" /></span>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" value={phone} onChange={(e) => handleChange(e, "phone")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><PhoneIcon fontSize="small" /></span>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={address} onChange={(e) => handleChange(e, "address")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><HomeIcon fontSize="small" /></span>
              {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="relative">
              <label className="block text-gray-300 text-xs mb-1" htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={city} onChange={(e) => handleChange(e, "city")}
                className="w-full border border-gray-700 bg-[#18181b]/80 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 pl-10 text-sm" />
              <span className="absolute left-2 top-6.5 text-blue-400"><LocationCityIcon fontSize="small" /></span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base font-semibold transition-all duration-200"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-floatCard {
          animation: floatCard 3s ease-in-out infinite;
        }
      `}</style>

    </>
  );
};

export default PayHereForm;
