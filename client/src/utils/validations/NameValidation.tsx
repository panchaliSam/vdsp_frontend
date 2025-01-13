const validateName = (name: string):string | null => {
    const nameRegex = /^[a-zA-Z\s'-]+$/;

    if(!name.trim()) return "Name is required.";
    if(name.length < 2) return "Name must be at least 2 characters long";
    if (name.length > 50) return "Name must not exceed 50 characters.";
    if (!nameRegex.test(name)) return "Name must only contain letters, spaces, hyphens, or apostrophes.";
  
    return null;
};

export default validateName;