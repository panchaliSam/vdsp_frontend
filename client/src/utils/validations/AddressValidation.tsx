const validateAddress = (value: string): string | null => {
  if (!value.trim()) {
    return "Address cannot be empty.";
  }
  if (value.length < 5) {
    return "Address must be at least 5 characters.";
  }
  return null;
};

export default validateAddress;
