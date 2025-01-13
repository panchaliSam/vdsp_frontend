const validateName = (name: string): string | null => {
  const nameRegex = /^[a-zA-Z]+$/;

  name = name.trim();
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  if (!name) return "Name is required.";
  if (name.length < 2) return "Name must be at least 2 characters long.";
  if (name.length > 50) return "Name must not exceed 50 characters.";
  if (!nameRegex.test(name)) return "Only allowed one name.";

  return null;
};

export default validateName;
