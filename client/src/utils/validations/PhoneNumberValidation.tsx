const validatePhoneNumber = (phoneNumber: string): string | null => {
  const phoneRegex = /^(?:\+94|0)(?:7[0-9]{8}|1[0-9]{8})$/;

  if (!phoneNumber.trim()) return "Phone number is required.";
  if (!phoneRegex.test(phoneNumber))
    return "Invalid Sri Lankan phone number format.";

  return null;
};

export default validatePhoneNumber;
