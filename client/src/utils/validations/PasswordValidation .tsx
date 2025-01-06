const PasswordValidation = (password: string): string | null => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&#]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 charcters long.";
  }
  if (!hasLetter) {
    return "Password must contain at least one letter.";
  }
  if (!hasNumber) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar) {
    return "Password must contain at least one special character (@, $, !, %, *, ?, &, #).";
  }
  return null;
};

export default PasswordValidation;
