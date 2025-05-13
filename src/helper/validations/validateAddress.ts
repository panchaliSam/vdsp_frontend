export const validateAddress = (address: string): string | null => {
  return address.trim().length > 0 ? null : "Address cannot be empty.";
};
