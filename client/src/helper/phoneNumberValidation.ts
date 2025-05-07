export const validatePhoneNumber = (phoneNumber: string): string | null => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber)
    ? null
    : "Phone number must be exactly 10 digits.";
};
