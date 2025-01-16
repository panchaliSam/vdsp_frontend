const ConfirmPasswordValidation = (
  password: string,
  confirmPassword: string
): string | null => {
  if (confirmPassword === "") {
    return "Confirm password is required";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
};

export default ConfirmPasswordValidation;
