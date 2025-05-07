export const validatePasswordStrength = (password: string): string | null => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
    return "Password must contain uppercase, lowercase, digit, and special character.";
  }
  return null;
};
